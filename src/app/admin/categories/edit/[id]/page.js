"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { toast } from "sonner";

import CategoryForm from "@/components/admin/categories/CategoryForm";

import {
  getCategoryById,
  updateCategory,
} from "@/services/category.service";

import {
  Skeleton,
} from "@/components/ui/skeleton";

export default function EditCategoryPage() {
  const router =
    useRouter();

  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [category, setCategory] =
    useState(null);

  useEffect(() => {
    const fetchCategory =
      async () => {
        try {
          const response =
            await getCategoryById(id);

          setCategory(
            response.category
          );
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              "Failed to load category"
          );

          router.push(
            "/admin/categories"
          );
        } finally {
          setFetching(false);
        }
      };

    if (id) {
      fetchCategory();
    }
  }, [id, router]);

  const handleSubmit =
    async (data) => {
      try {
        setLoading(true);

        await updateCategory(
          id,
          data
        );

        toast.success(
          "Category updated successfully"
        );

        router.push(
          "/admin/categories"
        );

        router.refresh();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update category"
        );
      } finally {
        setLoading(false);
      }
    };

  if (fetching) {
    return (
      <div className="max-w-3xl space-y-6">

        <Skeleton className="h-10 w-64" />

        <Skeleton className="h-[600px] w-full rounded-xl" />

      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="text-muted-foreground mt-2">
          Update category details.
        </p>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <CategoryForm
          defaultValues={{
            name:
              category.name,

            image:
              category.image,

            description:
              category.description,

            isActive:
              category.isActive,
          }}
          loading={loading}
          onSubmit={
            handleSubmit
          }
        />

      </div>

    </div>
  );
}