import api from "@/lib/axios";

export const orderService = {
  getMyOrders: async () => {
    const response = await api.get(
      "/orders"
    );

    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(
      `/orders/${id}`
    );

    return response.data;
  },
};
