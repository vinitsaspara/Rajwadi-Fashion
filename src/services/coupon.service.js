import api from "@/lib/axios";

export const couponService = {
  validateCoupon: async (code) => {
    const response = await api.post(
      "/coupons/validate",
      { code }
    );

    return response.data;
  },
};