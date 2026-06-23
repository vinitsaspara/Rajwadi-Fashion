import api from "@/lib/axios";

export const addressService = {
  getAddresses: async () => {
    const response = await api.get(
      "/address"
    );

    return response.data;
  },

  addAddress: async (data) => {
    const response = await api.post(
      "/address",
      data
    );

    return response.data;
  },
};