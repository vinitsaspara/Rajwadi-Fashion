"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

export default function ActiveFilters({
  filters,
  categories,
  onRemove,
  onClear,
}) {
  const badges = [];

  if (filters.categoryId) {
    const category =
      categories.find(
        (item) =>
          item.id ===
          filters.categoryId
      );

    badges.push({
      key: "categoryId",
      label:
        category?.name ||
        "Category",
    });
  }

  if (
    filters.minPrice ||
    filters.maxPrice
  ) {
    badges.push({
      key: "price",
      label: `₹${filters.minPrice || 0} - ₹${
        filters.maxPrice || "∞"
      }`,
    });
  }

  if (filters.rating) {
    badges.push({
      key: "rating",
      label: `${filters.rating}★ & Up`,
    });
  }

  if (filters.inStock) {
    badges.push({
      key: "inStock",
      label: "In Stock",
    });
  }

  if (filters.featured) {
    badges.push({
      key: "featured",
      label: "Featured",
    });
  }

  if (filters.bestSeller) {
    badges.push({
      key: "bestSeller",
      label: "Best Seller",
    });
  }

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Active Filters
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
        >
          Clear All
        </Button>

      </div>

      <div className="flex flex-wrap gap-2">

        {badges.map((badge) => (
          <Badge
            key={badge.key}
            className="flex items-center gap-2 px-3 py-1"
          >
            {badge.label}

            <button
              onClick={() =>
                onRemove(
                  badge.key
                )
              }
            >
              <X
                size={14}
                className="cursor-pointer"
              />
            </button>

          </Badge>
        ))}

      </div>

    </div>
  );
}