"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CategoryForm from "@/components/admin/categories/CategoryForm";
import { createCategory } from "@/services/category.service";

export default function AddCategoryPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    data
  ) => {
    try {
      setLoading(true);

      await createCategory(data);

      toast.success(
        "Category created successfully"
      );

      router.push(
        "/admin/categories"
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add Category
        </h1>

        <p className="text-muted-foreground mt-2">
          Create a new product
          category.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <CategoryForm
          onSubmit={
            handleSubmit
          }
          loading={loading}
        />
      </div>
    </div>
  );
}