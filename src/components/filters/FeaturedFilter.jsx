"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FeaturedFilter({
  featured,
  bestSeller,
  onFeaturedChange,
  onBestSellerChange,
}) {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Product Type
      </h3>

      <div className="space-y-3">

        <div className="flex items-center space-x-2">

          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) =>
              onFeaturedChange(
                Boolean(checked)
              )
            }
          />

          <Label
            htmlFor="featured"
            className="cursor-pointer"
          >
            Featured Products
          </Label>

        </div>

        <div className="flex items-center space-x-2">

          <Checkbox
            id="bestSeller"
            checked={bestSeller}
            onCheckedChange={(checked) =>
              onBestSellerChange(
                Boolean(checked)
              )
            }
          />

          <Label
            htmlFor="bestSeller"
            className="cursor-pointer"
          >
            Best Sellers
          </Label>

        </div>

      </div>

    </div>
  );
}