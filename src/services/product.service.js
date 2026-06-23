import api from "@/lib/axios";

export const productService = {
  // Get All Products
  getProducts: async (params = {}) => {
    const response = await api.get(
      "/products",
      {
        params,
      }
    );

    return response.data;
  },

  // Get Product By Id
  getProductById: async (id) => {
    const response = await api.get(
      `/products/${id}`
    );

    return response.data;
  },

  // Create Product
  createProduct: async (data) => {
    const response = await api.post(
      "/products",
      data
    );

    return response.data;
  },

  // Update Product
  updateProduct: async (id, data) => {
    const response = await api.patch(
      `/products/${id}`,
      data
    );

    return response.data;
  },

  // Delete Product (Soft Delete)
  deleteProduct: async (id) => {
    const response = await api.delete(
      `/products/${id}`
    );

    return response.data;
  },
};