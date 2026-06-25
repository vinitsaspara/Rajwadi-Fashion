import axiosInstance from "./axios";

export const createPaymentOrder =
  async () => {
    const response =
      await axiosInstance.post(
        "/payment/create-order"
      );

    return response.data;
};

export const verifyPayment =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/payment/verify",
        data
      );

    return response.data;
};