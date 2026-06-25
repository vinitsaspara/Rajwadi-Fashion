"use client";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { toast } from "sonner";

import {
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";

import {
  setWishlist,
  removeWishlistItem,
} from "@/store/slices/wishlistSlice";

import WishlistCard from "./WishlistCard";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
    async () => {
      try {
        const response =
          await getWishlist();

        dispatch(
          setWishlist(
            response.wishlist
          )
        );
      } catch (error) {
        toast.error(
          "Failed to load wishlist"
        );
      }
    };

  const handleRemove =
    async (productId) => {
      try {
        await removeFromWishlist(
          productId
        );

        dispatch(
          removeWishlistItem(
            productId
          )
        );

        toast.success(
          "Removed from wishlist"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to remove wishlist"
        );
      }
    };

  if (
    wishlist.length === 0
  ) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">

        <h1 className="text-4xl font-bold">
          My Wishlist
        </h1>

        <p className="mt-4 text-muted-foreground">
          Your wishlist is empty.
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {wishlist.map(
          (item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={
                handleRemove
              }
            />
          )
        )}

      </div>

    </div>
  );
}