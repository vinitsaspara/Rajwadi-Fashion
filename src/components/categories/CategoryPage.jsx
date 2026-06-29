"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

import { setCategories, setLoading } from "@/store/slices/categorySlice";

import { getCategories } from "@/services/category.service";

import CategoryCard from "./CategoryCard";

export default function CategoryPage() {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(setLoading(true));

        const response = await getCategories();

        dispatch(setCategories(response.categories));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load categories",
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCategories();
  }, [dispatch, categories.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Shop By Category</h1>

        <p className="text-muted-foreground mt-2">
          Discover our latest collections
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20">No Categories Found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}
