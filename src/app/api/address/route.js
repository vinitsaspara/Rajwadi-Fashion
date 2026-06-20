
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";


export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    if (body.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address =
      await prisma.address.create({
        data: {
          ...body,
          userId: user.id,
        },
      });

    return NextResponse.json({
      success: true,
      address,
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

export async function GET() {
  try {

    const user =
      await authMiddleware();

    const addresses =
      await prisma.address.findMany({
        where: {
          userId: user.id,
        },

        orderBy: {
          isDefault: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      addresses,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}