import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";
import { generateSlug } from "@/utils/generateSlug";
import { uploadImage } from "@/utils/uploadImage";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
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
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        category,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await adminMiddleware();

    const { id } = await params;
    console.log("id : ", id);

    const formData = await request.formData();

    const name = formData.get("name");

    const description = formData.get("description");

    const image = formData.get("image");

    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
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

    let imageUrl = existingCategory.image;

    if (image && image.size > 0) {
      imageUrl = await uploadImage(image);
    }

    const updatedName = name || existingCategory.name;

    const updatedDescription = description || existingCategory.description;

    const updatedSlug = generateSlug(updatedName);

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: updatedName,
        description: updatedDescription,
        image: imageUrl,
        slug: updatedSlug,
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

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
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
