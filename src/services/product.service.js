import axiosInstance from "./axios";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

export const searchProducts = async (query, limit = 8) => {
  const response = await axiosInstance.get(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );

  return response.data;
};
