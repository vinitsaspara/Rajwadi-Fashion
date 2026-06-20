import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

export async function PATCH(
  request,
  { params }
) {
  try {

    await adminMiddleware();

    const { status } =
      await request.json();

    const order =
      await prisma.order.update({
        where: {
          id: params.id,
        },

        data: {
          status,
        },
      });

    return NextResponse.json({
      success: true,
      order,
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