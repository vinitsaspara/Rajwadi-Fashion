import api from "@/lib/axios";

export const uploadService = {
  uploadImage: async (formData) => {
    const response = await api.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};