"use client";

import Image from "next/image";

export default function ProductImageGallery({
  images,
  mainImage,
  setMainImage,
}) {
  return (
    <div>

      {/* Main Image */}

      <div className="relative h-[500px] border rounded-xl overflow-hidden">

        <Image
          src={mainImage}
          alt="product"
          fill
          className="object-cover"
        />

      </div>

      {/* Thumbnails */}

      <div className="flex gap-3 mt-4">

        {images.map(
          (image, index) => (
            <button
              key={index}
              onClick={() =>
                setMainImage(
                  image
                )
              }
              className={`border rounded-lg overflow-hidden ${
                mainImage ===
                image
                  ? "border-black"
                  : ""
              }`}
            >
              <img
                src={image}
                alt=""
                className="h-20 w-20 object-cover"
              />
            </button>
          )
        )}

      </div>

    </div>
  );
}