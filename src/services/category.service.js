import axiosInstance from "./axios";

export const getCategories = async () => {
  const response =
    await axiosInstance.get(
      "/categories"
    );

  // console.log(response.data)

  return response.data;
};