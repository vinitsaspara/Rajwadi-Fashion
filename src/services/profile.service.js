import axiosInstance from "./axios";

export const getProfileStats = async () => {
  const response = await axiosInstance.get(
    "/auth/profile/stats"
  );

  return response.data;
};