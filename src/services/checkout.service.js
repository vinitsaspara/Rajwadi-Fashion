import api from "@/lib/axios";

export const checkoutService = {
  applyCoupon: async (data) => {
    const response = await api.post(
      "/checkout",
      data
    );

    return response.data;
  },
};