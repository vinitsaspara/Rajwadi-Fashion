import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";
import { generateSlug } from "@/utils/generateSlug";

export async function GET(
  request,
  { params }
) {
  try {
     const { id } = await params;
    const category =
      await prisma.category.findUnique({
        where: {
          id,
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

    return NextResponse.json(
      {
        success: true,
        category,
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


export async function PATCH(
  request,
  { params }
) {
  try {
    await adminMiddleware();

    const body = await request.json();
     const { id } = await params;


    const { name, image, description } =
      body;

    const category =
      await prisma.category.update({
        where: {
          id
        },
        data: {
          name,
          image,
          description,
          slug: generateSlug(name),
        },
      });

    return NextResponse.json({
      success: true,
      category,
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


export async function DELETE(
  request,
  { params }
) {
  try {
    await adminMiddleware();

     const { id } = await params;


    await prisma.category.de({
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
        "Category deleted successfully",
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