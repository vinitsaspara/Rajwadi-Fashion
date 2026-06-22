import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const cartService = {
  getCart: async () => {
    const response = await api.get(
      API_ENDPOINTS.CART.GET
    );

    return response.data;
  },

  addToCart: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.CART.ADD,
      data
    );

    return response.data;
  },

  updateCart: async (data) => {
    const response = await api.patch(
      API_ENDPOINTS.CART.UPDATE,
      data
    );

    return response.data;
  },

  removeCartItem: async (id) => {
    const response = await api.delete(
      `${API_ENDPOINTS.CART.REMOVE}/${id}`
    );

    return response.data;
  },
};