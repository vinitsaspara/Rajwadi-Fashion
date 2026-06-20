import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";

export async function GET(
  request,
  { params }
) {
  try {

    const {id} = await params;

    const product =
      await prisma.product.findUnique({
        where: {
          id
        },

        include: {
          category: true,

          colors: {
            include: {
              sizes: true,
            },
          },

          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
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

export async function PATCH(
  request,
  { params }
) {
  try {

    await adminMiddleware();

    const body =
      await request.json();

    const {id} = await params

    const {
      name,
      description,
      price,
      discountPrice,
      categoryId,
      isFeatured,
      isBestSeller,
    } = body;

    const product =
      await prisma.product.update({
        where: {
          id
        },

        data: {
          name,

          slug:
            name
              ? generateSlug(name)
              : undefined,

          description,

          price,

          discountPrice,

          categoryId,

          isFeatured,

          isBestSeller,
        },
      });

    return NextResponse.json({
      success: true,
      product,
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

    await adminMiddleware();

    const {id} = await params

    await prisma.product.update({
      where: {
        id
      },

      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Product deleted successfully",
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