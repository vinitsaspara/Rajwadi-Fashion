import axiosInstance from "./axios";

export const addToCart = async (data) => {
  const response = await axiosInstance.post("/cart", data);

  return response.data;
};

export const getCart = async () => {
  const response = await axiosInstance.get("/cart");

  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axiosInstance.patch(`/cart/${cartItemId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await axiosInstance.delete(`/cart/${cartItemId}`);

  return response.data;
};

export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart");

  return response.data;
};
