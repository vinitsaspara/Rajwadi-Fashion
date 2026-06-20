import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

export async function GET() {
  try {
    await adminMiddleware();

    const totalOrders =
      await prisma.order.count();

    const revenue =
      await prisma.payment.aggregate({
        where: {
          status: "SUCCESS",
        },
        _sum: {
          amount: true,
        },
      });

    const totalRevenue =
      Number(revenue._sum.amount || 0);

    const averageOrderValue =
      totalOrders > 0
        ? totalRevenue / totalOrders
        : 0;

    return NextResponse.json({
      success: true,
      report: {
        totalOrders,
        totalRevenue,
        averageOrderValue,
      },
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