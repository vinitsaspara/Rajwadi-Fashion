"use client";

import Image from "next/image";
import Link from "next/link";

import { Heart, ShoppingCart } from "lucide-react";

import { toast } from "sonner";

import { addToCart } from "@/services/cart.service";

import { Card, CardContent } from "@/components/ui/card";

import { addCartItem } from "@/store/slices/cartSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToWishlist, removeFromWishlist } from "@/services/wishlist.service";

import {
  addWishlistItem,
  removeWishlistItem,
} from "@/store/slices/wishlistSlice";

import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();

  const image =
    product.colors?.[0]?.images?.[0] ||
    "https://placehold.co/600x800?text=Product";

  const discount = product.discountPrice
    ? Math.round(
        ((Number(product.price) - Number(product.discountPrice)) /
          Number(product.price)) *
          100,
      )
    : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const firstColor = product.colors?.[0];

      const firstSize = firstColor?.sizes?.[0];

      if (!firstColor || !firstSize) {
        toast.error("Product variant unavailable");

        return;
      }

      setAdding(true);

      const response = await addToCart({
        productId: product.id,

        color: firstColor.colorName,

        size: firstSize.size,

        quantity: 1,
      });

      dispatch(
        addCartItem({
          id: response.cartItem?.id || Date.now(),

          productId: product.id,

          color: firstColor.colorName,

          size: firstSize.size,

          quantity: 1,

          product,
        }),
      );

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add cart");
    } finally {
      setAdding(false);
    }
  };

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const isWishlisted = wishlist.some((item) => item.productId === product.id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlistLoading) return;

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await removeFromWishlist(product.id);

        dispatch(removeWishlistItem(product.id));

        toast.success("Removed from wishlist");
      } else {
        const response = await addToWishlist(product.id);

        dispatch(
          addWishlistItem({
            ...response.wishlist,
            product,
          }),
        );

        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}

          {product.isBestSeller && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          {product.category?.name}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mt-1 line-clamp-1 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold">₹{product.discountPrice}</span>

          {product.discountPrice && (
            <>
              <span className="text-sm line-through text-muted-foreground">
                ₹{product.price}
              </span>

              <span className="text-sm text-green-600 font-medium">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            className="flex-1"
            size="sm"
            disabled={adding}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />

            {adding ? "Adding..." : "Add"}
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={wishlistLoading}
            onClick={handleWishlist}
          >
            <Heart
              className={`h-4 w-4 transition ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
