
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";



export async function GET() {
  try {
    await adminMiddleware();

    const topProducts =
  await prisma.orderItem.groupBy({
    by: ["productId"],

    _sum: {
      quantity: true,
    },

    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },

    take: 10,
  });

    return NextResponse.json({
      success: true,
      topProducts
    });
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


