"use client";

import { useSelector } from "react-redux";

export const useWishlist = () => {
  return useSelector((state) => state.wishlist);
};