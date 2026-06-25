import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { authMiddleware } from "@/middleware/auth";

import { addToCartSchema } from "@/validations/cart.validation";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const validation =
      addToCartSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const {
      productId,
      color,
      size,
      quantity,
    } = validation.data;

    const existingItem =
      await prisma.cartItem.findFirst({
        where: {
          userId: user.id,
          productId,
          color,
          size,
        },
      });

    if (existingItem) {
      const updatedItem =
        await prisma.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity:
              existingItem.quantity +
              quantity,
          },
        });

      return NextResponse.json({
        success: true,
        cartItem: updatedItem,
      });
    }

    const cartItem =
      await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId,
          color,
          size,
          quantity,
        },
      });

    return NextResponse.json(
      {
        success: true,
        cartItem,
      },
      { status: 201 }
    );
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
    const user = await authMiddleware();

    const cart =
      await prisma.cartItem.findMany({
        where: {
          userId: user.id,
        },

        include: {
          product: {
            include: {
              category: true,
              colors: true,
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      cart,
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

export async function DELETE() {
  try {
    const user = await authMiddleware();

    const deletedItems =
      await prisma.cartItem.deleteMany({
        where: {
          userId: user.id,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Cart cleared successfully",
        deletedCount: deletedItems.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}