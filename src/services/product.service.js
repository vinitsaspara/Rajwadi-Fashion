import axiosInstance from "./axios";

export const getProducts = async ({
  page = 1,
  search = "",
  categoryId = "",
  isFeatured = false,
}) => {
  const params =
    new URLSearchParams();

  params.set("page", page);

  if (search?.trim()) {
    params.set(
      "search",
      search.trim()
    );
  }

  if (categoryId) {
    params.set(
      "categoryId",
      categoryId
    );
  }

  if (isFeatured) {
    params.set(
      "isFeatured",
      "true"
    );
  }

  const response =
    await axiosInstance.get(
      `/products?${params.toString()}`
    );

  return response.data;

};


export const getProductById = async (id) => {
  const response =
    await axiosInstance.get(
      `/products/${id}`
    );

  return response.data;
};

export const searchProducts = async (
  query,
  limit = 8
) => {
  const response =
    await axiosInstance.get(
      `/products/search?q=${encodeURIComponent(
        query
      )}&limit=${limit}`
    );

  return response.data;
};