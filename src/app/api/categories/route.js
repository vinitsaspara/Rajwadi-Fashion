import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

import { generateSlug } from "@/utils/generateSlug";

import { createCategorySchema } from "@/validations/category.validation";

export async function POST(request) {
  try {
    await adminMiddleware();

    const body = await request.json();

    const validation =
      createCategorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation?.error?.errors[0]?.message,
        },
        { status: 400 }
      );
    }

    const {
      name,
      image,
      description,
    } = validation.data;

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
        { status: 409 }
      );
    }

    const category =
      await prisma.category.create({
        data: {
          name,
          slug,
          image,
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
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status:
          error.message === "Forbidden"
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