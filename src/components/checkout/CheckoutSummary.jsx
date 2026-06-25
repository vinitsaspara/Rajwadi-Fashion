"use client";

import { Button } from "@/components/ui/button";
import RazorpayButton from "../payment/RazorpayButton";

export default function CheckoutSummary({ checkoutData, onContinue, loading }) {
  if (!checkoutData) {
    return (
      <div className="border rounded-xl p-6">
        <h2 className="font-semibold text-xl">Order Summary</h2>

        <p className="text-sm text-muted-foreground mt-3">
          Select your address and apply a coupon (if any), then continue to
          calculate the final amount.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-5">Order Summary</h2>

      <div className="space-y-4">
        {checkoutData.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.product.name}</p>

              <p className="text-sm text-muted-foreground">
                {item.color} • {item.size} × {item.quantity}
              </p>
            </div>

            <span className="font-medium">
              ₹{Number(item.product.discountPrice) * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{checkoutData.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span className="text-green-600">-₹{checkoutData.discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>FREE</span>
        </div>
      </div>

      <hr className="my-5" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>

        <span>₹{checkoutData.finalAmount}</span>
      </div>

      <RazorpayButton shippingAddress={checkoutData.shippingAddress} />
    </div>
  );
}
