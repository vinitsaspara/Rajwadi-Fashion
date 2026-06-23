import api from "@/lib/axios";

export const reportService = {
  // Sales Report
  getSalesReport: async () => {
    const response = await api.get(
      "/reports/sales"
    );

    return response.data;
  },

  // Revenue Report
  getRevenueReport: async () => {
    const response = await api.get(
      "/reports/revenue"
    );

    return response.data;
  },

  // Product Report
  getProductReport: async () => {
    const response = await api.get(
      "/reports/products"
    );

    return response.data;
  },

  // Customer Report
  getCustomerReport: async () => {
    const response = await api.get(
      "/reports/customers"
    );

    return response.data;
  },

  // Export CSV
  exportCsv: async () => {
    const response = await api.get(
      "/reports/export-csv",
      {
        responseType: "blob",
      }
    );

    return response.data;
  },

  // Export Excel
  exportExcel: async () => {
    const response = await api.get(
      "/reports/export-excel",
      {
        responseType: "blob",
      }
    );

    return response.data;
  },
};