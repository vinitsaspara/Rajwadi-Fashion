import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";

import { updateProductSchema } from "@/validations/product.validation";
import { uploadImages } from "@/utils/uploadImages";

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

    const { id } = await params;

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

    const isActive = formData.get("isActive") === "true";

    const colors = JSON.parse(formData.get("colors"));

    const validation = updateProductSchema.safeParse({
      name,
      description,
      price,
      discountPrice,
      categoryId,
      isFeatured,
      isBestSeller,
      isActive,
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

    for (const color of colors) {
      const sizeSet = new Set();

      for (const size of color.sizes) {
        if (sizeSet.has(size.size)) {
          return NextResponse.json(
            {
              success: false,
              message: `Duplicate size "${size.size}" found in ${color.colorName}.`,
            },
            {
              status: 400,
            },
          );
        }

        sizeSet.add(size.size);
      }
    }

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
          {
            status: 404,
          },
        );
      }
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        colors: {
          include: {
            sizes: true,
          },
        },
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    const slug = name ? generateSlug(name) : existingProduct.slug;

    // Build Colors with Images

    const formattedColors = [];

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      const uploadedFiles = formData.getAll(`colorImages-${i}`);

      let imageUrls = [];

      if (
        uploadedFiles.length > 0 &&
        uploadedFiles.some((file) => file.size > 0)
      ) {
        imageUrls = await uploadImages(uploadedFiles);
      } else if (
        Array.isArray(color.existingImages) &&
        color.existingImages.length > 0
      ) {
        imageUrls = color.existingImages;
      } else if (
        Array.isArray(color.existingImages) &&
        color.existingImages.length > 0
      ) {
        imageUrls = color.existingImages;
      } else {
        const oldColor = existingProduct.colors.find(
          (c) => c.colorName === color.colorName,
        );

        imageUrls = oldColor?.images || [];
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

    const product = await prisma.$transaction(async (tx) => {
      // Remove all existing variants
      await tx.productColor.deleteMany({
        where: {
          productId: id,
        },
      });

      // Update product and recreate variants
      return await tx.product.update({
        where: {
          id,
        },

        data: {
          name,

          slug,

          description,

          price,

          discountPrice,

          categoryId,

          isFeatured,

          isBestSeller,

          isActive,

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
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product,
      },
      {
        status: 200,
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
