import api from "@/lib/axios";

export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");

    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch(
      "/users/profile",
      data
    );

    return response.data;
  },
};