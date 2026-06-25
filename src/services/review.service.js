import axiosInstance from "./axios";

export const addReview = async (data) => {
  const response = await axiosInstance.post(
    "/reviews",
    data
  );

  return response.data;
};

export const updateReview = async (
  reviewId,
  data
) => {
  const response = await axiosInstance.patch(
    `/reviews/${reviewId}`,
    data
  );

  return response.data;
};

export const deleteReview = async (
  reviewId
) => {
  const response = await axiosInstance.delete(
    `/reviews/${reviewId}`
  );

  return response.data;
};