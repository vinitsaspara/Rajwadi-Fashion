import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

import { wishlistSchema } from "@/validations/wishlist.validation";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const validation =
      wishlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { productId } =
      validation.data;

    const existingWishlist =
      await prisma.wishlist.findUnique({
        where: {
          userId_productId: {
            userId: user.id,
            productId,
          },
        },
      });

    if (existingWishlist) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product already in wishlist",
        },
        { status: 409 }
      );
    }

    const wishlist =
      await prisma.wishlist.create({
        data: {
          userId: user.id,
          productId,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Added to wishlist",
        wishlist,
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

    const wishlist =
      await prisma.wishlist.findMany({
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
      wishlist,
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