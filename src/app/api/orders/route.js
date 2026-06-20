import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function GET() {
  try {
    const user = await authMiddleware();

    const orders =
      await prisma.order.findMany({
        where: {
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