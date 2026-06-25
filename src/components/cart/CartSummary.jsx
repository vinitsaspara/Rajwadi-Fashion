"use client";

import { Button } from "@/components/ui/button";

export default function CartSummary({
  cart,
  onClearCart,
}) {
  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        Number(
          item.product
            .discountPrice
        ) *
          item.quantity,
      0
    );

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <div className="border rounded-xl p-6 sticky top-24">

      <h2 className="text-xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Items</span>

          <span>
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₹{subtotal}
          </span>
        </div>

      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-lg">

        <span>Total</span>

        <span>
          ₹{subtotal}
        </span>

      </div>

      <Button
        className="w-full mt-6"
      >
        Checkout
      </Button>

      <Button
        variant="outline"
        className="w-full mt-3"
        onClick={
          onClearCart
        }
      >
        Clear Cart
      </Button>

    </div>
  );
}