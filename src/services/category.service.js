import axiosInstance from "./axios";

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

export const updateCategory =
  async (id, data) => {
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

    if (data.image) {
      formData.append(
        "image",
        data.image
      );
    }

    const response =
      await axiosInstance.patch(
        `/categories/${id}`,
        formData
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

export const createCategory =
  async (data) => {
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
        formData
      );

    return response.data;
  };