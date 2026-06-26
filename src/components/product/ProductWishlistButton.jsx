"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";

import {
  addWishlistItem,
  removeWishlistItem,
} from "@/store/slices/wishlistSlice";

export default function ProductWishlistButton({
  product,
}) {
  const dispatch =
    useDispatch();

  const wishlist =
    useSelector(
      (state) =>
        state.wishlist.wishlist
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const isWishlisted =
    wishlist.some(
      (item) =>
        item.productId ===
        product.id
    );

  const handleWishlist =
    async () => {
      try {
        setLoading(true);

        if (
          isWishlisted
        ) {
          await removeFromWishlist(
            product.id
          );

          dispatch(
            removeWishlistItem(
              product.id
            )
          );

          toast.success(
            "Removed from wishlist"
          );
        } else {
          const response =
            await addToWishlist(
              product.id
            );

          dispatch(
            addWishlistItem({
              ...response.wishlist,
              product,
            })
          );

          toast.success(
            "Added to wishlist"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Wishlist failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={loading}
      onClick={
        handleWishlist
      }
    >
      <Heart
        className={`transition-all duration-300 hover:scale-110 ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : ""
        }`}
      />
    </Button>
  );
}