import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";

import { createCategorySchema } from "@/validations/category.validation";

import { uploadImage } from "@/utils/uploadImage";

export async function POST(request) {
  try {
    await adminMiddleware();

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");

    const validation =
      createCategorySchema.safeParse({
        name,
        description,
      });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    if (!image || image.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const slug = generateSlug(name);

    const existingCategory =
      await prisma.category.findUnique({
        where: {
          slug,
        },
      });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category already exists",
        },
        {
          status: 409,
        }
      );
    }

    const imageUrl =
      await uploadImage(image);

    const category =
      await prisma.category.create({
        data: {
          name,
          slug,
          image: imageUrl,
          description,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Category created successfully",
        category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status:
          error.message ===
          "Forbidden"
            ? 403
            : 500,
      }
    );
  }
}

export async function GET() {
  try {
    const categories =
      await prisma.category.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}