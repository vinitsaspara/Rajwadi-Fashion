"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function SearchResultCard({
  product,
  onSelect,
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={onSelect}
    >
      <Card className="p-3 hover:bg-muted transition cursor-pointer">

        <div className="flex gap-3">

          <img
            src={
              product.colors?.[0]
                ?.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.name}
            className="w-16 h-16 rounded-md object-cover border"
          />

          <div className="flex-1">

            <h4 className="font-semibold line-clamp-1">
              {product.name}
            </h4>

            <p className="text-xs text-muted-foreground">
              {product.category.name}
            </p>

            <div className="flex gap-2 mt-2">

              <span className="font-semibold">
                ₹
                {
                  product.discountPrice
                }
              </span>

              <span className="line-through text-muted-foreground text-sm">

                ₹
                {product.price}

              </span>

            </div>

          </div>

        </div>

      </Card>
    </Link>
  );
}