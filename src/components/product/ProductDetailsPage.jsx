"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { getProductById } from "@/services/product.service";

import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductVariants from "./ProductVariants";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";

import ReviewSection from "@/components/review/ReviewSection";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [mainImage, setMainImage] =
    useState("");

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(null);

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const fetchProduct =
    async () => {
      try {
        setLoading(true);

        const response =
          await getProductById(id);

        const product =
          response.product;

        setProduct(product);

        const firstColor =
          product.colors?.[0];

        setSelectedColor(
          firstColor || null
        );

        setSelectedSize(
          firstColor?.sizes?.[0] ||
            null
        );

        setMainImage(
          firstColor?.images?.[0] ||
            ""
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleColorChange = (
    color
  ) => {
    setSelectedColor(color);

    setSelectedSize(
      color.sizes?.[0] || null
    );

    setMainImage(
      color.images?.[0] || ""
    );

    setQuantity(1);
  };

  const increaseQuantity =
    () => {
      if (
        selectedSize &&
        quantity <
          selectedSize.stock
      ) {
        setQuantity(
          (prev) => prev + 1
        );
      }
    };

  const decreaseQuantity =
    () => {
      if (quantity > 1) {
        setQuantity(
          (prev) => prev - 1
        );
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <ProductImageGallery
            images={
              selectedColor?.images ||
              []
            }
            mainImage={
              mainImage
            }
            setMainImage={
              setMainImage
            }
          />

          <div>

            <ProductInfo
              product={product}
            />

            <ProductPricing
              price={
                product.price
              }
              discountPrice={
                product.discountPrice
              }
            />

            <ProductVariants
              colors={
                product.colors
              }
              selectedColor={
                selectedColor
              }
              selectedSize={
                selectedSize
              }
              onColorChange={
                handleColorChange
              }
              onSizeChange={(
                size
              ) => {
                setSelectedSize(
                  size
                );
                setQuantity(1);
              }}
            />

            <ProductQuantity
              quantity={
                quantity
              }
              stock={
                selectedSize?.stock
              }
              onIncrease={
                increaseQuantity
              }
              onDecrease={
                decreaseQuantity
              }
            />

            <ProductActions
              product={
                product
              }
              selectedColor={
                selectedColor
              }
              selectedSize={
                selectedSize
              }
              quantity={
                quantity
              }
            />

          </div>

        </div>

      </div>

      <ReviewSection
        product={product}
        refreshProduct={
          fetchProduct
        }
      />

    </div>
  );
}