import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const orderService = {
  getOrders: async () => {
    const response = await api.get(
      API_ENDPOINTS.ORDERS.GET_ALL
    );

    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(
      API_ENDPOINTS.ORDERS.GET_BY_ID(id)
    );

    return response.data;
  },
};