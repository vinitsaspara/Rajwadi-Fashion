"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { getOrders } from "@/services/order.service";

import OrderCard from "./OrderCard";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response =
        await getOrders();

      console.log(
        "Orders Response:",
        response
      );

      setOrders(
        response?.orders || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to load orders"
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">
          No Orders Yet
        </h2>

        <p className="text-muted-foreground mt-2">
          Start shopping to place your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
}