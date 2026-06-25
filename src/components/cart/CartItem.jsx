"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    
  const image = item.product?.colors?.[0]?.images?.[0] || "/placeholder.jpg";

  return (
    <div className="border rounded-xl p-4 flex gap-4">
      <div className="relative h-28 w-28 rounded-lg overflow-hidden border">
        <Image
          src={image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.product.name}</h3>

        <p className="text-sm text-muted-foreground">
          {item.product.category?.name}
        </p>

        <div className="flex gap-4 mt-3 text-sm">
          <span>
            Color:
            <strong className="ml-1">{item.color}</strong>
          </span>

          <span>
            Size:
            <strong className="ml-1">{item.size}</strong>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onDecrease(item)}
            className="h-8 w-8 border rounded-md flex items-center justify-center"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="font-medium min-w-[30px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item)}
            className="h-8 w-8 border rounded-md flex items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">
          ₹{Number(item.product.discountPrice) * item.quantity}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="mt-3 text-red-500"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Remove
      </Button>
    </div>
  );
}
