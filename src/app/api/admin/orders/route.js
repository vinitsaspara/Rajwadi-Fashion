import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

export async function GET() {
  try {

    await adminMiddleware();

    const orders =
      await prisma.order.findMany({
        include: {
          user: true,

          orderItems: {
            include: {
              product: true,
            },
          },

          payment: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      orders,
    });

  } catch (error) {

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