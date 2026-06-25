import axiosInstance from "./axios";

export const getOrders = async () => {
  const response =
    await axiosInstance.get("/orders");

  return response.data;
};

export const getOrderById = async (
  id
) => {
  const response =
    await axiosInstance.get(
      `/orders/${id}`
    );

  return response.data;
};