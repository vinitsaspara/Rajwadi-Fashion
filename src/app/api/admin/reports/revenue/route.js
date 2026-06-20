import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

export async function GET() {
  try {
    await adminMiddleware();

    const payments = await prisma.payment.findMany({
      where: {
        status: "SUCCESS",
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const monthlyRevenue = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Apr", revenue: 0 },
      { month: "May", revenue: 0 },
      { month: "Jun", revenue: 0 },
      { month: "Jul", revenue: 0 },
      { month: "Aug", revenue: 0 },
      { month: "Sep", revenue: 0 },
      { month: "Oct", revenue: 0 },
      { month: "Nov", revenue: 0 },
      { month: "Dec", revenue: 0 },
    ];

    payments.forEach((payment) => {
      const monthIndex =
        new Date(payment.createdAt).getMonth();

      monthlyRevenue[monthIndex].revenue += Number(
        payment.amount
      );
    });

    return NextResponse.json(
      {
        success: true,
        data: monthlyRevenue,
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