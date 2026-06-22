import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get(
      API_ENDPOINTS.WISHLIST.GET
    );

    return response.data;
  },

  addToWishlist: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.WISHLIST.ADD,
      data
    );

    return response.data;
  },

  removeWishlistItem: async (id) => {
    const response = await api.delete(
      `${API_ENDPOINTS.WISHLIST.REMOVE}/${id}`
    );

    return response.data;
  },
};