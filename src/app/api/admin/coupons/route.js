import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

export async function POST(request) {
  try {

    await adminMiddleware();

    const body =
      await request.json();

    const coupon =
      await prisma.coupon.create({
        data: {
          code:
            body.code.toUpperCase(),

          discountPercent:
            body.discountPercent,

          minimumAmount:
            body.minimumAmount,

          expiryDate:
            new Date(
              body.expiryDate
            ),
        },
      });

    return NextResponse.json({
      success: true,
      coupon,
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


export async function GET() {

  try {

    await adminMiddleware();

    const coupons =
      await prisma.coupon.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      coupons,
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