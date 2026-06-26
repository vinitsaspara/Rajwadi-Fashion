import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";
import { updateProductSchema } from "@/validations/product.validation";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        isActive: true,
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

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
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
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await adminMiddleware();

    const body = await request.json();

    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { id } = await params;

    const {
      name,
      description,
      price,
      discountPrice,
      categoryId,
      isFeatured,
      isBestSeller,
      isActive,
      colors,
    } = validation.data;

    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          isActive: true,
        },
      });

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: "Category not found",
          },
          { status: 404 },
        );
      }
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const product = await prisma.$transaction(async (tx) => {
      if (colors !== undefined) {
        await tx.productColor.deleteMany({
          where: { productId: id },
        });
      }

      return tx.product.update({
        where: { id },

        data: {
          name,

          slug: name ? generateSlug(name) : undefined,

          description,

          price,

          discountPrice,

          categoryId,

          isFeatured,

          isBestSeller,

          isActive,

          ...(colors !== undefined && {
            colors: {
              create: colors.map((color) => ({
                colorName: color.colorName,
                images: color.images,
                sizes: {
                  create: color.sizes.map((variant) => ({
                    size: variant.size,
                    stock: variant.stock,
                  })),
                },
              })),
            },
          }),
        },

        include: {
          category: true,
          colors: {
            include: {
              sizes: true,
            },
          },
        },
      });
    });

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
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await adminMiddleware();

    const { id } = await params;

    await prisma.product.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
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
