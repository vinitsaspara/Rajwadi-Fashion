import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";
import { generateSku } from "@/utils/generateSku";

import { uploadImage } from "@/utils/uploadImage";

import { createProductSchema } from "@/validations/product.validation";


export async function POST(request) {
  try {
    await adminMiddleware();

    const formData = await request.formData();

    const name = formData.get("name");

    const description = formData.get("description");

    const price = Number(formData.get("price"));

    const discountPrice = formData.get("discountPrice")
      ? Number(formData.get("discountPrice"))
      : null;

    const categoryId = formData.get("categoryId");

    const isFeatured = formData.get("isFeatured") === "true";

    const isBestSeller = formData.get("isBestSeller") === "true";

    const colors = JSON.parse(formData.get("colors"));

    const validation = createProductSchema.safeParse({
      name,
      description,
      price,
      discountPrice,
      categoryId,
      isFeatured,
      isBestSeller,
      colors,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        },
        {
          status: 400,
        },
      );
    }

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
        {
          status: 404,
        },
      );
    }

    const slug = generateSlug(name);

    const productCount = await prisma.product.count();

    const sku = generateSku(category.name, productCount);

    // Upload Images for Every Color

    const formattedColors = [];

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      // Get all uploaded files for this color
      const imageFiles = formData.getAll(`colorImages-${i}`);

      if (imageFiles.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Please upload at least one image for ${color.colorName}`,
          },
          {
            status: 400,
          },
        );
      }

      const imageUrls = [];

      for (const file of imageFiles) {
        if (file.size === 0) {
          continue;
        }

        const imageUrl = await uploadImage(file);

        imageUrls.push(imageUrl);
      }

      formattedColors.push({
        colorName: color.colorName,

        images: imageUrls,

        sizes: color.sizes.map((size) => ({
          size: size.size,

          stock: Number(size.stock),
        })),
      });
    }

    const product = await prisma.product.create({
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
          create: formattedColors.map((color) => ({
            colorName: color.colorName,

            images: color.images,

            sizes: {
              create: color.sizes.map((size) => ({
                size: size.size,

                stock: size.stock,
              })),
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

        message: "Product created successfully",

        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: error.message,
      },
      {
        status: error.message === "Forbidden" ? 403 : 500,
      },
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 12;

    const search = searchParams.get("search") || "";

    const categoryId = searchParams.get("categoryId");

    const minPrice = searchParams.get("minPrice");

    const maxPrice = searchParams.get("maxPrice");

    const rating = searchParams.get("rating");

    const featured = searchParams.get("featured");

    const bestSeller = searchParams.get("bestSeller");

    const inStock = searchParams.get("inStock");

    const sort = searchParams.get("sort") || "newest";
    const where = {
      isActive: true,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(categoryId && {
        categoryId,
      }),

      ...(minPrice || maxPrice
        ? {
            discountPrice: {
              ...(minPrice && {
                gte: Number(minPrice),
              }),

              ...(maxPrice && {
                lte: Number(maxPrice),
              }),
            },
          }
        : {}),

      ...(rating && {
        averageRating: {
          gte: Number(rating),
        },
      }),

      ...(featured === "true" && {
        isFeatured: true,
      }),

      ...(bestSeller === "true" && {
        isBestSeller: true,
      }),

      ...(inStock === "true" && {
        colors: {
          some: {
            sizes: {
              some: {
                stock: {
                  gt: 0,
                },
              },
            },
          },
        },
      }),
    };
    let orderBy = {
      createdAt: "desc",
    };

    switch (sort) {
      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "price-low":
        orderBy = {
          discountPrice: "asc",
        };
        break;

      case "price-high":
        orderBy = {
          discountPrice: "desc",
        };
        break;

      case "rating":
        orderBy = {
          averageRating: "desc",
        };
        break;

      case "name-asc":
        orderBy = {
          name: "asc",
        };
        break;

      case "name-desc":
        orderBy = {
          name: "desc",
        };
        break;

      default:
        orderBy = {
          createdAt: "desc",
        };
    }

    const products = await prisma.product.findMany({
      where,

      include: {
        category: true,

        colors: {
          include: {
            sizes: true,
          },
        },
      },

      orderBy,

      skip: (page - 1) * limit,

      take: limit,
    });

    const total = await prisma.product.count({
      where,
    });

    return NextResponse.json({
      success: true,

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),

      products,
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
