"use client";

import { useState } from "react";
import Image from "next/image";

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] =
    useState(images[0]);

  return (
    <div>
      <div className="relative h-[500px] border rounded-lg overflow-hidden">
        <Image
          src={selectedImage}
          alt="product"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex gap-3 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedImage(image)
            }
            className="relative w-20 h-20 border rounded overflow-hidden"
          >
            <Image
              src={image}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;