import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/razorpay";

import { authMiddleware } from "@/middleware/auth";

export async function POST(request) {
  try {
    await authMiddleware();

    const { amount } =
      await request.json();

    const razorpayOrder =
      await getRazorpayClient().orders.create({
        amount: amount * 100,

        currency: "INR",

        receipt:
          "receipt_" + Date.now(),
      });

    return NextResponse.json({
      success: true,

      order: razorpayOrder,
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
