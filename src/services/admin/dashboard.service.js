import api from "@/lib/axios";

export const dashboardService = {
  // Dashboard Statistics
  getDashboardStats: async () => {
    const response = await api.get(
      "/dashboard"
    );

    return response.data;
  },

  // Revenue Chart Data
  getRevenueChart: async () => {
    const response = await api.get(
      "/dashboard/revenue-chart"
    );

    return response.data;
  },

  // Top Products
  getTopProducts: async () => {
    const response = await api.get(
      "/dashboard/top-products"
    );

    return response.data;
  },
};