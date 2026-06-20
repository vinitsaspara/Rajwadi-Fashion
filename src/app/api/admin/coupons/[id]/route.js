import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

export async function PATCH(request, { params }) {
  try {
    await adminMiddleware();

    const { id } = await params;

    const body = await request.json();

    const data = {};

    if (body.code !== undefined) data.code = body.code;

    if (body.discountPercent !== undefined)
      data.discountPercent = body.discountPercent;

    if (body.minimumAmount !== undefined)
      data.minimumAmount = body.minimumAmount;

    if (body.expiryDate !== undefined)
      data.expiryDate = new Date(body.expiryDate);

    if (body.isActive !== undefined) data.isActive = body.isActive;

    const coupon = await prisma.coupon.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      coupon,
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

export async function DELETE(
  request,
  { params }
) {
  try {

    await adminMiddleware();
    const { id } = await params;


    await prisma.coupon.update({
      where: {
        id
      },

      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Coupon deleted",
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