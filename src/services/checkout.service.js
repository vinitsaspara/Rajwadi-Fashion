import axiosInstance from "./axios";

export const checkout = async (
  data
) => {
  const response =
    await axiosInstance.post(
      "/checkout",
      data
    );

  return response.data;
};