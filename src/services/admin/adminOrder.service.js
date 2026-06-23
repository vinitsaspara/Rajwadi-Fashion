import api from "@/lib/axios";

export const orderService = {
  // Get All Orders (Admin)
  getOrders: async () => {
    const response = await api.get(
      "/orders"
    );

    return response.data;
  },

  // Update Order Status (Admin)
  updateOrderStatus: async (
    id,
    status
  ) => {
    const response = await api.patch(
      `/orders/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },
};