import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File is required",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "rajwadi-fashion",
            },
            (error, result) => {
              if (error) reject(error);

              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      {
        success: true,

        imageUrl: result.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload Failed",
      },
      { status: 500 }
    );
  }
}