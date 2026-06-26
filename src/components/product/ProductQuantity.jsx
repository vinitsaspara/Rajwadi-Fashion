"use client";

import { Minus, Plus } from "lucide-react";

export default function ProductQuantity({
  quantity,
  stock,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-3">
        Quantity
      </h3>

      <div className="flex items-center gap-4">

        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="h-10 w-10 border rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
        >
          <Minus size={18} />
        </button>

        <span className="font-semibold text-lg min-w-[30px] text-center">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          disabled={
            !stock ||
            quantity >= stock
          }
          className="h-10 w-10 border rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
        >
          <Plus size={18} />
        </button>

      </div>

      {stock > 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Maximum available: {stock}
        </p>
      )}
    </div>
  );
}