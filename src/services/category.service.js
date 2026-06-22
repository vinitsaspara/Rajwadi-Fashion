import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const categoryService = {
  getCategories: async () => {
    const response = await api.get(
      API_ENDPOINTS.CATEGORIES.GET_ALL
    );

    return response.data;
  },
};