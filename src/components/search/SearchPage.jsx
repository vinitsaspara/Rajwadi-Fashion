"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { searchProducts } from "@/services/product.service";

import { toast } from "sonner";

import ProductCard from "@/components/product/ProductCard";

export default function SearchPage() {
  const searchParams =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const response =
          await searchProducts(
            query,
            100
          );

        setProducts(
          response.products
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Search failed"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold">
        Search Results
      </h1>

      <p className="text-muted-foreground mt-2">
        {products.length} result
        {products.length !== 1 && "s"}
        {" "}
        found for
        {" "}
        <span className="font-semibold">
          "{query}"
        </span>
      </p>

      {products.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            No Products Found
          </h2>

          <p className="text-muted-foreground mt-3">
            Try another keyword.
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {products.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}

        </div>
      )}

    </div>
  );
}