import api from "@/lib/axios";

export const cartService = {
  getCart: async () => {
    const response = await api.get(
      "/cart"
    );

    return response.data;
  },

  addToCart: async (data) => {
    const response = await api.post(
      "/cart",
      data
    );

    return response.data;
  },

  updateCart: async (
    cartItemId,
    data
  ) => {
    const response = await api.patch(
      `/cart/${cartItemId}`,
      data
    );

    return response.data;
  },

  removeFromCart: async (
    cartItemId
  ) => {
    const response = await api.delete(
      `/cart/${cartItemId}`
    );

    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete(
      "/cart"
    );

    return response.data;
  },
};
