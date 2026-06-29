import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file) {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rajwadi-fashion",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}