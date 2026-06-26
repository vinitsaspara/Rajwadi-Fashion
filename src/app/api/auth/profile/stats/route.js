import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function GET() {
  try {
    const user =
      await authMiddleware();

    const [
      orders,
      wishlist,
      reviews,
      addresses,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          userId: user.id,
        },
      }),

      prisma.wishlist.count({
        where: {
          userId: user.id,
        },
      }),

      prisma.review.count({
        where: {
          userId: user.id,
        },
      }),

      prisma.address.count({
        where: {
          userId: user.id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      stats: {
        orders,
        wishlist,
        reviews,
        addresses,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}