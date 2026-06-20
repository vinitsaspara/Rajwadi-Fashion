import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

export async function GET() {
  try {

    await adminMiddleware();

    // Total Revenue

    const revenue =
      await prisma.payment.aggregate({
        where: {
          status: "SUCCESS",
        },

        _sum: {
          amount: true,
        },
      });

    // Total Orders

    const totalOrders =
      await prisma.order.count();

    // Total Products

    const totalProducts =
      await prisma.product.count();

    // Total Customers

    const totalCustomers =
      await prisma.user.count({
        where: {
          role: "CUSTOMER",
        },
      });

    // Recent Orders

    const recentOrders =
      await prisma.order.findMany({
        take: 10,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          user: true,
        },
      });

    return NextResponse.json({
      success: true,

      dashboard: {
        totalRevenue:
          revenue._sum.amount || 0,

        totalOrders,

        totalProducts,

        totalCustomers,

        recentOrders,
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