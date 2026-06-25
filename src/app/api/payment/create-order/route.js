import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getRazorpayClient } from "@/lib/razorpay";
import { authMiddleware } from "@/middleware/auth";

export async function POST() {
  try {
    const user = await authMiddleware();

    const cartItems =
      await prisma.cartItem.findMany({
        where: {
          userId: user.id,
        },

        include: {
          product: true,
        },
      });

    if (!cartItems.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        { status: 400 }
      );
    }

    const amount =
      cartItems.reduce(
        (sum, item) => {
          const price = Number(
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

    const razorpayOrder =
      await getRazorpayClient().orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt:
          "receipt_" + Date.now(),
      });

    return NextResponse.json({
      success: true,

      order: razorpayOrder,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}