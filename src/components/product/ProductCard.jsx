"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

import ProductPrice from "./ProductPrice";

const ProductCard = ({ product }) => {
  const productImage =
    product.colors?.[0]?.images?.[0] ||
    "/placeholder-product.jpg";

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-80 overflow-hidden">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category?.name}
        </p>

        <h3 className="font-semibold mt-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>
            {product.averageRating}
          </span>
        </div>

        <div className="mt-3">
          <ProductPrice
            price={Number(product.price)}
            discountedPrice={Number(
              product.discountPrice
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;