import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { authMiddleware } from "@/middleware/auth";

import { checkoutSchema } from "@/validations/checkout.validation";

import { calculateCartTotal } from "@/utils/calculateCartTotal";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 },
      );
    }

    const { couponCode, shippingAddress } = validation.data;

    const cartItems = await prisma.cartItem.findMany({
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
        { status: 400 },
      );
    }

    let subtotal = calculateCartTotal(cartItems);

    let discount = 0;

    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          code: couponCode,
          isActive: true,
        },
      });

      if (
        coupon &&
        coupon.expiryDate > new Date() &&
        subtotal >= Number(coupon.minimumAmount)
      ) {
        discount = (subtotal * coupon.discountPercent) / 100;
      }
    }

    const finalAmount = subtotal - discount;

    return NextResponse.json({
      success: true,

      checkout: {
        items: cartItems,
        subtotal,
        discount,
        finalAmount,
        shippingAddress,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
