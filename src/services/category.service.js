import api from "@/lib/axios";

export const categoryService = {
  // Get All Categories
  getCategories: async () => {
    const response = await api.get(
      "/categories"
    );

    return response.data;
  },

  // Get Category By Id
  getCategoryById: async (id) => {
    const response = await api.get(
      `/categories/${id}`
    );

    return response.data;
  },

  // Create Category
  createCategory: async (data) => {
    const response = await api.post(
      "/categories",
      data
    );

    return response.data;
  },

  // Update Category
  updateCategory: async (id, data) => {
    const response = await api.put(
      `/categories/${id}`,
      data
    );

    return response.data;
  },

  // Delete Category (Soft Delete)
  deleteCategory: async (id) => {
    const response = await api.delete(
      `/categories/${id}`
    );

    return response.data;
  },
};