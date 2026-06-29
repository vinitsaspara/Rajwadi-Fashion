"use client";

import Link from "next/link";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

export default function RecentOrders({
  orders = [],
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between p-6 border-b">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Latest customer orders
          </p>

        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <Link href="/admin/orders">
            View All
          </Link>
        </Button>

      </div>

      {orders.length === 0 ? (

        <div className="py-16 text-center text-muted-foreground">
          No orders found.
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-muted/30">

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Order
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customer
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Amount
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-muted/30 transition-colors"
                >

                  <td className="px-6 py-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{order.total}
                  </td>

                  <td className="px-6 py-4">

                    <Badge
                      variant={
                        order.status === "DELIVERED"
                          ? "default"
                          : order.status === "PENDING"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>

                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {order.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}