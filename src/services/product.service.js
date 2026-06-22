import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get(
      API_ENDPOINTS.PRODUCTS.GET_ALL,
      {
        params,
      }
    );

    return response.data;
  },

  getProductBySlug: async (slug) => {
    const response = await api.get(
      API_ENDPOINTS.PRODUCTS.GET_BY_SLUG(slug)
    );

    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get(
      API_ENDPOINTS.PRODUCTS.FEATURED
    );

    return response.data;
  },

  getNewArrivals: async () => {
    const response = await api.get(
      API_ENDPOINTS.PRODUCTS.NEW_ARRIVALS
    );

    return response.data;
  },

  getBestSellers: async () => {
    const response = await api.get(
      API_ENDPOINTS.PRODUCTS.BEST_SELLERS
    );

    return response.data;
  },
};