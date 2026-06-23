import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";
import { updateAddressSchema } from "@/validations/address.validation";

const errorStatus = (error) =>
  error.message === "Unauthorized" ? 401 : 500;

export async function PATCH(request, { params }) {
  try {
    const user = await authMiddleware();
    const { id } = await params;
    const body = await request.json();

    const validation = updateAddressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 }
      );
    }

    const address = await prisma.$transaction(async (tx) => {
      if (validation.data.isDefault) {
        await tx.address.updateMany({
          where: {
            userId: user.id,
            id: { not: id },
          },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id },
        data: validation.data,
      });
    });

    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: errorStatus(error) }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await authMiddleware();
    const { id } = await params;

    const existingAddress = await prisma.address.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.address.delete({
        where: { id },
      });

      if (existingAddress.isDefault) {
        const nextAddress = await tx.address.findFirst({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          select: { id: true },
        });

        if (nextAddress) {
          await tx.address.update({
            where: { id: nextAddress.id },
            data: { isDefault: true },
          });
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: errorStatus(error) }
    );
  }
}
