"use client";

import { useMemo } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

export default function PricingSection({
  control,
  watch,
}) {
  const price =
    Number(watch("price")) || 0;

  const discountPrice =
    Number(
      watch("discountPrice")
    ) || 0;

  const discountPercentage =
    useMemo(() => {
      if (
        !price ||
        !discountPrice ||
        discountPrice >= price
      ) {
        return 0;
      }

      return Math.round(
        ((price - discountPrice) /
          price) *
          100
      );
    }, [
      price,
      discountPrice,
    ]);

  return (
    <div className="rounded-xl border p-6 space-y-6">

      <div>

        <h2 className="text-xl font-semibold">
          Pricing
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Set the product price and discount.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Price */}

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Price (₹)
              </FormLabel>

              <FormControl>

                <Input
                  type="number"
                  placeholder="Enter price"
                  min={0}
                  {...field}
                />

              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />

        {/* Discount Price */}

        <FormField
          control={control}
          name="discountPrice"
          render={({ field }) => (
            <FormItem>

              <FormLabel>
                Discount Price (₹)
              </FormLabel>

              <FormControl>

                <Input
                  type="number"
                  placeholder="Enter discount price"
                  min={0}
                  {...field}
                />

              </FormControl>

              <FormMessage />

            </FormItem>
          )}
        />

      </div>

      {/* Discount Preview */}

      {discountPercentage > 0 && (

        <div className="rounded-lg border bg-green-50 p-4">

          <p className="text-sm font-medium text-green-700">

            Customer saves{" "}

            <span className="font-bold">
              {discountPercentage}%
            </span>

          </p>

        </div>

      )}

    </div>
  );
}