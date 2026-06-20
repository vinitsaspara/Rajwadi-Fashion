import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

export async function DELETE(
  request,
  { params }
) {
  try {
    const user = await authMiddleware();

    const {productId} = await params

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Removed from wishlist",
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