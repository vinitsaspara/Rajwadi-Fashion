import { uploadImage } from "./uploadImage";

export async function uploadImages(files) {
  const imageUrls = [];

  for (const file of files) {
    const url = await uploadImage(file);
    imageUrls.push(url);
  }

  return imageUrls;
}