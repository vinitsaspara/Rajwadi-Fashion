
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";



export async function GET() {
  try {
    await adminMiddleware();

   const totalCustomers =
  await prisma.user.count({
    where: {
      role: "CUSTOMER",
    },
  });

const recentCustomers =
  await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    take: 10,

    orderBy: {
      createdAt: "desc",
    },
  });

    return NextResponse.json({
      success: true,
      report: {
        totalCustomers,
        recentCustomers
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


