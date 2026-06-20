import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";
import { generateSku } from "@/utils/generateSku";

import { createProductSchema } from "@/validations/product.validation";

export async function POST(request) {
  try {
    await adminMiddleware();

    const body = await request.json();

    const validation =
      createProductSchema.safeParse(body);

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
      name,
      description,
      price,
      discountPrice,
      categoryId,
      colors,
      isFeatured,
      isBestSeller,
    } = validation.data;

    // Check Category

    const category =
      await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }

    const slug = generateSlug(name);

    const productCount =
      await prisma.product.count();

    const sku = generateSku(
      category.name,
      productCount
    );

    const product =
      await prisma.product.create({
        data: {
          name,
          slug,
          sku,

          description,

          price,
          discountPrice,

          categoryId,

          isFeatured,
          isBestSeller,

          colors: {
            create: colors.map((color) => ({
              colorName:
                color.colorName,

              images: color.images,

              sizes: {
                create:
                  color.sizes.map(
                    (size) => ({
                      size: size.size,
                      stock: size.stock,
                    })
                  ),
              },
            })),
          },
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

    return NextResponse.json(
      {
        success: true,
        message:
          "Product created successfully",

        product,
      },
      { status: 201 }
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const page =
      Number(searchParams.get("page")) || 1;

    const limit = 10;

    const search =
      searchParams.get("search") || "";

    const categoryId =
      searchParams.get("categoryId");

    const isFeatured =
      searchParams.get("isFeatured");

    const where = {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(categoryId && {
        categoryId,
      }),

      ...(isFeatured === "true" && {
        isFeatured: true,
      }),
    };

    const products =
      await prisma.product.findMany({
        where,

        include: {
          category: true,

          colors: {
            include: {
              sizes: true,
            },
          },
        },

        skip: (page - 1) * limit,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      });

    const total =
      await prisma.product.count({
        where,
      });

    return NextResponse.json({
      success: true,

      total,

      page,

      totalPages: Math.ceil(
        total / limit
      ),

      products,
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