
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { authMiddleware } from "@/middleware/auth";

export async function PATCH(request, { params }) {
  try {
    const user = await authMiddleware();

    const { cartItemId } = await params;

    // console.log("cartItetmId : ", cartItemId);

    const { quantity } = await request.json();

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId: user.id,
      },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });

    // console.log("cartItetm : ", cartItem);

    return NextResponse.json({
      success: true,
      cartItem,
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

    const user =
      await authMiddleware();

    const { cartItemId } = await params;


    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Cart item removed",
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