"use client";

import Image from "next/image";
import Link from "next/link";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function WishlistCard({
  item,
  onRemove,
}) {
  const product = item.product;

  const image =
    product.colors?.[0]?.images?.[0] ||
    "https://placehold.co/600x800?text=Product";

  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">

      <Link href={`/products/${product.id}`}>

        <div className="relative h-72">

          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
          />

        </div>

      </Link>

      <div className="p-4">

        <p className="text-sm text-muted-foreground">
          {product.category?.name}
        </p>

        <Link href={`/products/${product.id}`}>

          <h2 className="font-semibold text-lg mt-1 hover:text-primary">
            {product.name}
          </h2>

        </Link>

        <div className="flex items-center gap-2 mt-3">

          <span className="font-bold text-lg">
            ₹{product.discountPrice}
          </span>

          <span className="text-sm line-through text-muted-foreground">
            ₹{product.price}
          </span>

        </div>

        <div className="flex gap-2 mt-5">

          <Link
            href={`/products/${product.id}`}
            className="flex-1"
          >
            <Button className="w-full">
              View Product
            </Button>
          </Link>

          <Button
            variant="destructive"
            size="icon"
            onClick={() =>
              onRemove(product.id)
            }
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>

      </div>

    </div>
  );
}