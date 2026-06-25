"use client";

import Image from "next/image";

export default function OrderItem({
  item,
}) {
  const image =
    item.product?.colors?.[0]
      ?.images?.[0] ||
    "https://placehold.co/300x400?text=Product";

  const price =
    Number(item.price);

  const total =
    price * item.quantity;

  return (
    <div className="border rounded-xl p-5 flex flex-col md:flex-row gap-5">

      {/* Product Image */}

      <div className="relative h-32 w-28 rounded-lg overflow-hidden border shrink-0">

        <Image
          src={image}
          alt={item.product.name}
          fill
          className="object-cover"
        />

      </div>

      {/* Product Info */}

      <div className="flex-1 space-y-2">

        <h3 className="text-lg font-semibold">
          {item.product.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          SKU : {item.product.sku}
        </p>

        <div className="flex flex-wrap gap-6 text-sm">

          <span>
            Color :
            <strong className="ml-1">
              {item.color}
            </strong>
          </span>

          <span>
            Size :
            <strong className="ml-1">
              {item.size}
            </strong>
          </span>

          <span>
            Qty :
            <strong className="ml-1">
              {item.quantity}
            </strong>
          </span>

        </div>

      </div>

      {/* Price */}

      <div className="text-right min-w-[120px]">

        <p className="text-sm text-muted-foreground">
          ₹{price} × {item.quantity}
        </p>

        <h2 className="text-xl font-bold mt-2">
          ₹{total}
        </h2>

      </div>

    </div>
  );
}