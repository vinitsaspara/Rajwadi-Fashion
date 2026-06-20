import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { authMiddleware } from "@/middleware/auth";

import { createReviewSchema } from "@/validations/review.validation";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const validation =
      createReviewSchema.safeParse(body);

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
      rating,
      comment,
    } = validation.data;

    const existingReview =
      await prisma.review.findFirst({
        where: {
          userId: user.id,
          productId,
        },
      });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You already reviewed this product",
        },
        { status: 409 }
      );
    }

    const review =
      await prisma.review.create({
        data: {
          rating,
          comment,

          userId: user.id,

          productId,
        },
      });

    // Recalculate Average Rating

    const reviews =
      await prisma.review.findMany({
        where: {
          productId,
        },
      });

    const average =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      ) / reviews.length;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        averageRating: average,
      },
    });

    return NextResponse.json(
      {
        success: true,
        review,
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