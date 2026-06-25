"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

import { setCart } from "@/store/slices/cartSlice";

import { createPaymentOrder, verifyPayment } from "@/services/payment.service";

import { Button } from "@/components/ui/button";

export default function RazorpayButton({ shippingAddress }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { order } = await createPaymentOrder();

      console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Rajwadi Fashion",

        description: "Order Payment",

        handler: async (response) => {
          try {
            const verify = await verifyPayment({
              ...response,

              shippingAddress,
            });

            dispatch(setCart([]));

            toast.success("Payment Successful");

            router.push(`/orders/${verify.orderId}`);
          } catch (error) {
            toast.error(error.response?.data?.message || "Verification Failed");
          }
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full">
      {loading ? "Processing..." : "Proceed To Payment"}
    </Button>
  );
}
