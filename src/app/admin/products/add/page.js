"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import ProductForm from "@/components/admin/products/ProductForm";

import { createProduct } from "@/services/product.service";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    formData
  ) => {
    try {
      setLoading(true);

      await createProduct(formData);

      toast.success(
        "Product created successfully"
      );

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="text-muted-foreground mt-2">
          Create a new product with colors,
          images and sizes.
        </p>

      </div>

      {/* Form */}

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
        />

      </div>

    </div>
  );
}