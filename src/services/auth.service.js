import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const authService = {
  register: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    return response.data;
  },

  login: async (data) => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    return response.data;
  },

  logout: async () => {
    const response = await api.post(
      API_ENDPOINTS.AUTH.LOGOUT
    );

    return response.data;
  },

  getProfile: async () => {
    const response = await api.get(
      API_ENDPOINTS.AUTH.PROFILE
    );

    return response.data;
  },
};