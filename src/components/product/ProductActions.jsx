"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";

import { addToCart } from "@/services/cart.service";

import { addCartItem } from "@/store/slices/cartSlice";

import ProductWishlistButton from "./ProductWishlistButton";

export default function ProductActions({
  product,
  selectedColor,
  selectedSize,
  quantity,
}) {
  const dispatch =
    useDispatch();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleAddToCart =
    async () => {
      try {
        if (!selectedColor) {
          toast.error(
            "Please select color"
          );

          return;
        }

        if (!selectedSize) {
          toast.error(
            "Please select size"
          );

          return;
        }

        setLoading(true);

        const response =
          await addToCart({
            productId:
              product.id,

            color:
              selectedColor.colorName,

            size:
              selectedSize.size,

            quantity,
          });

        dispatch(
          addCartItem({
            id:
              response.cartItem.id,

            productId:
              product.id,

            color:
              selectedColor.colorName,

            size:
              selectedSize.size,

            quantity,

            product,
          })
        );

        toast.success(
          "Product added to cart"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to add cart"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleBuyNow =
    async () => {
      await handleAddToCart();

      window.location.href =
        "/checkout";
    };

  return (
    <div className="mt-8">

      <div className="flex gap-3">

        <Button
          className="flex-1"
          onClick={
            handleAddToCart
          }
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "Add To Cart"}
        </Button>

        <ProductWishlistButton
          product={product}
        />

      </div>

      <Button
        variant="outline"
        className="w-full h-12 mt-3"
        size="lg"
        onClick={
          handleBuyNow
        }
        disabled={loading}
      >
        Buy Now
      </Button>

    </div>
  );
}