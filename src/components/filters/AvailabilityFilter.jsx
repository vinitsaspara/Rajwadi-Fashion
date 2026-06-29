"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AvailabilityFilter({
  value,
  onChange,
}) {
  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Availability
      </h3>

      <div className="flex items-center space-x-2">

        <Checkbox
          id="inStock"
          checked={value}
          onCheckedChange={(checked) =>
            onChange(Boolean(checked))
          }
        />

        <Label
          htmlFor="inStock"
          className="cursor-pointer"
        >
          In Stock
        </Label>

      </div>

    </div>
  );
}