import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const addressService = {
  getAddresses: async () => {
    const response = await api.get(
      API_ENDPOINTS.ADDRESS.GET_ALL
    );

    return response.data;
  },

  createAddress: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.ADDRESS.CREATE,
      data
    );

    return response.data;
  },
};