import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query =
      searchParams.get("q")?.trim() || "";

    const limit = Number(
      searchParams.get("limit") || 12
    );

    if (!query) {
      return NextResponse.json({
        success: true,
        products: [],
      });
    }

    const products =
      await prisma.product.findMany({
        where: {
          isActive: true,

          name: {
            contains: query,
            mode: "insensitive",
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

        orderBy: {
          createdAt: "desc",
        },

        take: limit,
      });

    return NextResponse.json({
      success: true,
      count: products.length,
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
      }
    );
  }
}