import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

import { generateOrderNumber } from "@/utils/generateOrderNumber";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
    } = await request.json();

    // Verify Razorpay Signature

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(
      async (tx) => {

        // Get Cart

        const cartItems =
          await tx.cartItem.findMany({
            where: {
              userId: user.id,
            },

            include: {
              product: true,
            },
          });

        if (!cartItems.length) {
          throw new Error("Cart is empty");
        }

        // Calculate Total

        const totalAmount =
          cartItems.reduce(
            (sum, item) => {
              const price =
                Number(
                  item.product.discountPrice ??
                    item.product.price
                );

              return (
                sum +
                price * item.quantity
              );
            },
            0
          );

        // Create Order

        const order =
          await tx.order.create({
            data: {
              orderNumber:
                generateOrderNumber(),

              userId: user.id,

              totalAmount,

              status: "CONFIRMED",

              shippingAddress,

              paymentMethod:
                "RAZORPAY",
            },
          });

        // Create Order Items

        await tx.orderItem.createMany({
          data: cartItems.map(
            (item) => ({
              orderId: order.id,

              productId:
                item.productId,

              quantity:
                item.quantity,

              color: item.color,

              size: item.size,

              price:
                item.product.discountPrice ??
                item.product.price,
            })
          ),
        });

        // Create Payment

        await tx.payment.create({
          data: {
            orderId: order.id,

            razorpayOrderId:
              razorpay_order_id,

            razorpayPaymentId:
              razorpay_payment_id,

            amount: totalAmount,

            status: "SUCCESS",
          },
        });

        // Reduce Variant Stock

        for (const item of cartItems) {

          if (
            item.color &&
            item.size
          ) {

            const productColor =
              await tx.productColor.findFirst({
                where: {
                  productId:
                    item.productId,

                  colorName:
                    item.color,
                },
              });

            if (!productColor) {
              throw new Error(
                `Color ${item.color} not found`
              );
            }

            const variant =
              await tx.productVariant.findFirst({
                where: {
                  productColorId:
                    productColor.id,

                  size: item.size,
                },
              });

            if (!variant) {
              throw new Error(
                `Variant ${item.size} not found`
              );
            }

            if (
              variant.stock <
              item.quantity
            ) {
              throw new Error(
                "Insufficient stock"
              );
            }

            await tx.productVariant.update({
              where: {
                id: variant.id,
              },

              data: {
                stock:
                  variant.stock -
                  item.quantity,
              },
            });
          }
        }

        // Clear Cart

        await tx.cartItem.deleteMany({
          where: {
            userId: user.id,
          },
        });

        return order;
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Payment verified successfully",

        orderId: result.id,
      },
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}