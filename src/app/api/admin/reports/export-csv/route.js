import { Parser } from "json2csv";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin";

export async function GET() {
  try {
    await adminMiddleware();

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const rows = orders.map((order) => ({
      orderNumber: order.orderNumber,
      customerName: order.user.name,
      customerEmail: order.user.email,
      products: order.orderItems
        .map((item) => `${item.product.name} x${item.quantity}`)
        .join(", "),
      totalAmount: Number(order.totalAmount),
      orderStatus: order.status,
      paymentStatus: order.payment?.status ?? "PENDING",
      paymentMethod: order.paymentMethod ?? "",
      createdAt: order.createdAt.toISOString(),
    }));

    const parser = new Parser();
    const csv = parser.parse(rows);

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="orders.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.message === "Forbidden" ? 403 :
          error.message === "Unauthorized" ? 401 : 500,
      }
    );
  }
}
