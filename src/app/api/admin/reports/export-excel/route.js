import ExcelJS from "exceljs";
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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "Order Number", key: "orderNumber", width: 22 },
      { header: "Customer", key: "customerName", width: 24 },
      { header: "Email", key: "customerEmail", width: 30 },
      { header: "Products", key: "products", width: 45 },
      { header: "Total Amount", key: "totalAmount", width: 16 },
      { header: "Order Status", key: "orderStatus", width: 16 },
      { header: "Payment Status", key: "paymentStatus", width: 18 },
      { header: "Payment Method", key: "paymentMethod", width: 18 },
      { header: "Created At", key: "createdAt", width: 22 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
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
        createdAt: order.createdAt,
      });
    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getColumn("totalAmount").numFmt = "₹#,##0.00";
    worksheet.getColumn("createdAt").numFmt = "dd-mmm-yyyy hh:mm";

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="orders.xlsx"',
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
