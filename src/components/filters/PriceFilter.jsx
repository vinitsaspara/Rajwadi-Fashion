"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Price Range
      </h3>

      <div className="grid grid-cols-2 gap-3">

        <div className="space-y-2">

          <Label>
            Min Price
          </Label>

          <Input
            type="number"
            placeholder="₹0"
            min={0}
            value={minPrice}
            onChange={(e) =>
              onMinChange(
                e.target.value
              )
            }
          />

        </div>

        <div className="space-y-2">

          <Label>
            Max Price
          </Label>

          <Input
            type="number"
            placeholder="₹10000"
            min={0}
            value={maxPrice}
            onChange={(e) =>
              onMaxChange(
                e.target.value
              )
            }
          />

        </div>

      </div>

    </div>
  );
}