"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import ProductForm from "@/components/admin/products/ProductForm";

import {
  getProductById,
  updateProduct,
} from "@/services/product.service";

import { Skeleton } from "@/components/ui/skeleton";

export default function EditProductPage() {
  const router = useRouter();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response =
          await getProductById(id);

        const productData =
          response.product;

        setProduct({
          name: productData.name,

          description:
            productData.description,

          categoryId:
            productData.categoryId,

          price: Number(
            productData.price
          ),

          discountPrice:
            productData.discountPrice
              ? Number(
                  productData.discountPrice
                )
              : 0,

          isFeatured:
            productData.isFeatured,

          isBestSeller:
            productData.isBestSeller,

          isActive:
            productData.isActive,

          colors:
            productData.colors.map(
              (color) => ({
                colorName:
                  color.colorName,

                existingImages:
                  color.images,

                images: [],

                sizes:
                  color.sizes.map(
                    (size) => ({
                      size: size.size,

                      stock:
                        size.stock,
                    })
                  ),
              })
            ),
        });
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load product"
        );

        router.push(
          "/admin/products"
        );
      } finally {
        setFetching(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const handleSubmit =
    async (formData) => {
      try {
        setLoading(true);

        await updateProduct(
          id,
          formData
        );

        toast.success(
          "Product updated successfully"
        );

        router.push(
          "/admin/products"
        );

        router.refresh();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update product"
        );
      } finally {
        setLoading(false);
      }
    };

  if (fetching) {
    return (
      <div className="max-w-7xl space-y-6">

        <Skeleton className="h-10 w-64" />

        <Skeleton className="h-[900px] rounded-xl w-full" />

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="text-muted-foreground mt-2">
          Update product information,
          variants and images.
        </p>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <ProductForm
          defaultValues={product}
          loading={loading}
          onSubmit={handleSubmit}
        />

      </div>

    </div>
  );
}