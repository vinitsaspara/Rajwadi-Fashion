"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CouponBox({
  couponCode,
  setCouponCode,
  onApply,
  loading,
}) {
  return (
    <div className="border rounded-xl p-5">

      <h2 className="font-semibold text-lg mb-4">
        Coupon
      </h2>

      <div className="flex gap-3">

        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) =>
            setCouponCode(e.target.value)
          }
        />

        <Button
          onClick={onApply}
          disabled={loading}
        >
          Apply
        </Button>

      </div>

    </div>
  );
}