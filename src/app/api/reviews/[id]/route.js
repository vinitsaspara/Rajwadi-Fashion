import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";

import { createReviewSchema } from "@/validations/review.validation";

export async function PATCH(
  request,
  { params }
) {
  try {
    const user =
      await authMiddleware();

    const { id } =
      await params;

    const body =
      await request.json();

    const validation =
      createReviewSchema.safeParse(
        body
      );

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.errors[0]
              .message,
        },
        {
          status: 400,
        }
      );
    }

    const existingReview =
      await prisma.review.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existingReview) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Review not found",
        },
        {
          status: 404,
        }
      );
    }

    const review =
      await prisma.review.update({
        where: {
          id,
        },

        data: {
          rating:
            validation.data.rating,

          comment:
            validation.data.comment,
        },
      });

    // Recalculate Average Rating

    const reviews =
      await prisma.review.findMany({
        where: {
          productId:
            review.productId,
        },
      });

    const average =
      reviews.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      ) / reviews.length;

    await prisma.product.update({
      where: {
        id: review.productId,
      },

      data: {
        averageRating:
          average,
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Review updated successfully",

      review,
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

export async function DELETE(
  request,
  { params }
) {
  try {
    const user =
      await authMiddleware();

    const { id } =
      await params;

    const existingReview =
      await prisma.review.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existingReview) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Review not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.review.delete({
      where: {
        id,
      },
    });

    // Recalculate Product Rating

    const reviews =
      await prisma.review.findMany({
        where: {
          productId:
            existingReview.productId,
        },
      });

    const average =
      reviews.length
        ? reviews.reduce(
            (sum, item) =>
              sum + item.rating,
            0
          ) / reviews.length
        : 0;

    await prisma.product.update({
      where: {
        id:
          existingReview.productId,
      },

      data: {
        averageRating:
          average,
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Review deleted successfully",
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