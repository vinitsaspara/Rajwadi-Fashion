"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";

import ProductGallery from "./ProductGallery";
import ProductColorSelector from "./ProductColorSelector";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductQuantitySelector from "./ProductQuantitySelector";

import { productService } from "@/services/product.service";

const ProductDetails = ({ id }) => {
  const [product, setProduct] =
    useState(null);

  const [selectedColor, setSelectedColor] =
    useState(null);

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const response =
        await productService.getProductById(
          id
        );

      const productData =
        response.product;
    
        // console.log(productData)

      setProduct(productData);

      if (
        productData.colors.length > 0
      ) {
        setSelectedColor(
          productData.colors[0]
        );
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery
          images={
            selectedColor?.images || []
          }
        />

        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-2">
            ⭐ {product.averageRating}
          </p>

          <div className="mt-4">
            <span className="text-3xl font-bold">
              ₹{product.discountPrice}
            </span>

            <span className="ml-3 line-through text-gray-500">
              ₹{product.price}
            </span>
          </div>

          <div className="mt-8">
            <ProductColorSelector
              colors={product.colors}
              selectedColor={
                selectedColor
              }
              setSelectedColor={
                setSelectedColor
              }
            />
          </div>

          <div className="mt-8">
            <ProductSizeSelector
              sizes={
                selectedColor?.sizes ||
                []
              }
              selectedSize={
                selectedSize
              }
              setSelectedSize={
                setSelectedSize
              }
            />
          </div>

          <div className="mt-8">
            <ProductQuantitySelector
              quantity={quantity}
              setQuantity={
                setQuantity
              }
            />
          </div>

          <div className="flex gap-4 mt-10">
            <button className="bg-black text-white px-6 py-3 rounded-md">
              Add To Cart
            </button>

            <button className="border px-6 py-3 rounded-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Description
        </h2>

        <p>{product.description}</p>
      </div>
    </Container>
  );
};

export default ProductDetails