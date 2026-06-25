"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { getOrderById } from "@/services/order.service";

import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";

export default function OrderDetailsPage({
  orderId,
}) {
  const router = useRouter();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      try {
        const response =
          await getOrderById(
            orderId
          );

        setOrder(
          response.order
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <p className="text-muted-foreground mt-1">
            {order.orderNumber}
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() =>
            router.push(
              "/products"
            )
          }
        >
          Continue Shopping
        </Button>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          <div className="border rounded-xl p-5">

            <h2 className="font-semibold text-lg mb-4">
              Shipping Address
            </h2>

            <p>
              {
                order
                  .shippingAddress
                  .fullName
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .phone
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .address
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .city
              }
              ,{" "}
              {
                order
                  .shippingAddress
                  .state
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .pincode
              }
            </p>

          </div>

          <div className="space-y-4">

            {order.orderItems.map(
              (item) => (
                <OrderItem
                  key={
                    item.id
                  }
                  item={item}
                />
              )
            )}

          </div>

        </div>

        <OrderSummary
          order={order}
        />

      </div>

    </div>
  );
}