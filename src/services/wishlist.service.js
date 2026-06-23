import api from "@/lib/axios";

export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get(
      "/wishlist"
    );

    return response.data;
  },

  addToWishlist: async (data) => {
    const response = await api.post(
      "/wishlist",
      data
    );

    return response.data;
  },

  removeFromWishlist: async (
    productId
  ) => {
    const response = await api.delete(
      `/wishlist/${productId}`
    );

    return response.data;
  },
};