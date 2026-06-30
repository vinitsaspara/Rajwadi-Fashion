import axiosInstance from "./axios";


export const createCategory = async (
  data
) => {
  const formData =
    new FormData();

  formData.append(
    "name",
    data.name
  );

  formData.append(
    "description",
    data.description
  );

  formData.append(
    "image",
    data.image
  );

  const response =
    await axiosInstance.post(
      "/categories",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const getCategories = async () => {
  const response =
    await axiosInstance.get(
      "/categories"
    );

  // console.log(response.data)

  return response.data;
};


export const getCategoryById = async (
  id
) => {
  const response =
    await axiosInstance.get(
      `/categories/${id}`
    );

  return response.data;
};

export const updateCategory = async (
  id,
  data
) => {
  const formData = new FormData();

  formData.append("name", data.name);

  formData.append(
    "description",
    data.description
  );

  // Only send image if user selected a new one
  if (data.image instanceof File) {
    formData.append(
      "image",
      data.image
    );
  }

  const response =
    await axiosInstance.patch(
      `/categories/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const deleteCategory = async (
  id
) => {
  const response =
    await axiosInstance.delete(
      `/categories/${id}`
    );

  return response.data;
};

