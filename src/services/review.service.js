import api from "@/lib/axios";

export const reviewService = {
  addReview: async (data) => {
    const response = await api.post(
      "/reviews",
      data
    );

    return response.data;
  },
};