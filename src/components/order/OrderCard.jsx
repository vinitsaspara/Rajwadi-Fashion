"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OrderCard({
  order,
}) {
  const totalItems =
    order.orderItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (
    <div className="border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">

      <div className="space-y-2">

        <h2 className="font-semibold text-lg">
          {order.orderNumber}
        </h2>

        <p className="text-sm text-muted-foreground">
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </p>

        <div className="flex gap-4 text-sm">

          <span>
            {totalItems} Items
          </span>

          <span className="font-medium">
            ₹{order.totalAmount}
          </span>

        </div>

        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
          {order.status}
        </span>

      </div>

      <Link
        href={`/orders/${order.id}`}
      >
        <Button>
          View Details
        </Button>
      </Link>

    </div>
  );
}