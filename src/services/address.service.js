import axiosInstance from "./axios";

export const getAddresses =
  async () => {
    const response =
      await axiosInstance.get(
        "/address"
      );

    return response.data;
  };

export const addAddress =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/address",
        data
      );

    return response.data;
  };

export const updateAddress =
  async (
    id,
    data
  ) => {
    const response =
      await axiosInstance.patch(
        `/address/${id}`,
        data
      );

    return response.data;
  };

export const deleteAddress =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/address/${id}`
      );

    return response.data;
  };