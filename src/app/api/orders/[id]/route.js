import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  try {
    const user = await authMiddleware();

    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: user.id,
      },

      include: {
        orderItems: {
          include: {
            product: true,
          },
        },

        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      order,
      orderItems: {
        include: {
          product: {
            include: {
              colors: true,
            },
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
