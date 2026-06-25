"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  getAddresses,
} from "@/services/address.service";

import {
  checkout,
} from "@/services/checkout.service";

import CheckoutAddress from "./CheckoutAddress";

import CouponBox from "./CouponBox";

import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutPage() {
  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [couponCode, setCouponCode] =
    useState("");

  const [checkoutData, setCheckoutData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses =
    async () => {
      try {
        const response =
          await getAddresses();

        setAddresses(
          response.addresses
        );

        const defaultAddress =
          response.addresses.find(
            (address) =>
              address.isDefault
          );

        if (defaultAddress) {
          setSelectedAddress(
            defaultAddress
          );
        }
      } catch {
        toast.error(
          "Failed to load addresses"
        );
      }
    };

  const handleCheckout =
    async () => {
      if (!selectedAddress) {
        toast.error(
          "Please select address"
        );

        return;
      }

      try {
        setLoading(true);

        const response =
          await checkout({
            couponCode,

            shippingAddress: {
              fullName:
                selectedAddress.fullName,

              phone:
                selectedAddress.phone,

              address:
                selectedAddress.addressLine,

              city:
                selectedAddress.city,

              state:
                selectedAddress.state,

              pincode:
                selectedAddress.pincode,
            },
          });

        setCheckoutData(
          response.checkout
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Checkout failed"
        );
      } finally {
        setLoading(false);
      }
    };

return (
  <div className="max-w-7xl mx-auto px-4 py-10">

    <h1 className="text-3xl font-bold mb-8">
      Checkout
    </h1>

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Left Side */}

      <div className="lg:col-span-2 space-y-6">

        <CheckoutAddress
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <CouponBox
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          onApply={handleCheckout}
          loading={loading}
        />

      </div>

      {/* Right Side */}

      <CheckoutSummary
        checkoutData={checkoutData}
        loading={loading}
        onContinue={() => {
          // Next Step
        }}
      />

    </div>

  </div>
);
}