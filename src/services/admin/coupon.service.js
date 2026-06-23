import api from "@/lib/axios";

export const couponService = {
  // Get All Coupons
  getCoupons: async () => {
    const response = await api.get(
      "/admin/coupons"
    );

    return response.data;
  },

  // Create Coupon
  createCoupon: async (data) => {
    const response = await api.post(
      "/admin/coupons",
      data
    );

    return response.data;
  },

  // Update Coupon
  updateCoupon: async (id, data) => {
    const response = await api.patch(
      `/admin/coupons/${id}`,
      data
    );

    return response.data;
  },

  // Delete Coupon (Soft Delete)
  deleteCoupon: async (id) => {
    const response = await api.delete(
      `/admin/coupons/${id}`
    );

    return response.data;
  },
};