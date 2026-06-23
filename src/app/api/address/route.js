
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";
import { createAddressSchema } from "@/validations/address.validation";


export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const validation = createAddressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const addressCount = await prisma.address.count({
      where: { userId: user.id },
    });

    const data = {
      ...validation.data,
      isDefault: validation.data.isDefault || addressCount === 0,
    };

    if (data.isDefault) {
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
          ...data,
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
