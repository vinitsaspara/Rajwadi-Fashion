import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const checkoutService = {
  createCheckout: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.CHECKOUT.CREATE,
      data
    );

    return response.data;
  },
};