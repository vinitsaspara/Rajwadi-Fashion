"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortSelect({
  value,
  onChange,
}) {
  return (
    <div className="space-y-3">

      <h3 className="text-lg font-semibold">
        Sort By
      </h3>

      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort Products" />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="newest">
            Newest First
          </SelectItem>

          <SelectItem value="oldest">
            Oldest First
          </SelectItem>

          <SelectItem value="price-low">
            Price: Low to High
          </SelectItem>

          <SelectItem value="price-high">
            Price: High to Low
          </SelectItem>

          <SelectItem value="rating">
            Highest Rated
          </SelectItem>

          <SelectItem value="name-asc">
            Name (A - Z)
          </SelectItem>

          <SelectItem value="name-desc">
            Name (Z - A)
          </SelectItem>

        </SelectContent>
      </Select>

    </div>
  );
}