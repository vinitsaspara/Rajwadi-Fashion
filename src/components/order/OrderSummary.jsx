"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary({
  order,
}) {
  const subtotal = order.orderItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        item.quantity,
    0
  );

  return (
    <div className="border rounded-xl p-6 h-fit sticky top-24">

      <h2 className="text-xl font-bold mb-6">
        Order Summary
      </h2>

      {/* Order Info */}

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Order Number
          </span>

          <span className="font-medium">
            {order.orderNumber}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Order Status
          </span>

          <Badge>
            {order.status}
          </Badge>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Payment
          </span>

          <Badge
            variant="secondary"
          >
            {
              order.payment
                ?.status
            }
          </Badge>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Method
          </span>

          <span>
            {
              order.paymentMethod
            }
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Ordered On
          </span>

          <span className="text-right">
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </span>

        </div>

      </div>

      <Separator className="my-6" />

      {/* Price */}

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>
            Subtotal
          </span>

          <span>
            ₹{subtotal}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Shipping
          </span>

          <span className="text-green-600">
            FREE
          </span>

        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">

          <span>
            Total
          </span>

          <span>
            ₹
            {
              order.totalAmount
            }
          </span>

        </div>

      </div>

    </div>
  );
}