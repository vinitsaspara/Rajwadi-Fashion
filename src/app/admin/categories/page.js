"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import Link from "next/link";

import { toast } from "sonner";

import {
  getCategories,
  deleteCategory,
} from "@/services/category.service";

import { Button } from "@/components/ui/button";

import CategorySearch from "@/components/admin/categories/CategorySearch";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategorySkeleton from "@/components/admin/categories/CategorySkeleton";
import EmptyCategory from "@/components/admin/categories/EmptyCategory";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const fetchCategories =
    async () => {
      try {
        setLoading(true);

        const response =
          await getCategories({
            search,
          });

        setCategories(
          response.categories
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, [search]);

  const handleDelete =
    async (id) => {
      try {
        await deleteCategory(id);

        toast.success(
          "Category deleted successfully"
        );

        fetchCategories();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage product categories
          </p>

        </div>

        <Button asChild>

          <Link href="/admin/categories/add">

            <Plus className="mr-2 h-4 w-4" />

            Add Category

          </Link>

        </Button>

      </div>

      <CategorySearch
        value={search}
        onChange={setSearch}
      />

      {loading ? (
        <CategorySkeleton />
      ) : categories.length ===
        0 ? (
        <EmptyCategory />
      ) : (
        <CategoryTable
          categories={categories}
          onDelete={
            handleDelete
          }
        />
      )}

    </div>
  );
}