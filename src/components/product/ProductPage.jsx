"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/services/category.service";

import FilterSidebar from "@/components/filters/FilterSidebar";

import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "next/navigation";


import { toast } from "sonner";

import { getProducts } from "@/services/product.service";

import { setProducts, setLoading } from "@/store/slices/productSlice";

import ProductCard from "./ProductCard";

import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";


export default function ProductPage() {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const categoryName = searchParams.get("categoryName");

  const { products, loading, totalPages } = useSelector(
    (state) => state.product,
  );

  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    categoryId: categoryId || "",

    minPrice: "",

    maxPrice: "",

    rating: "",

    featured: false,

    bestSeller: false,

    inStock: false,

    sort: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [JSON.stringify(filters), debouncedSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));

        const response = await getProducts({
          page: currentPage,
          search: debouncedSearch,
          ...filters,
        });

        dispatch(setProducts(response));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load products");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearch, filters, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        console.log(response)

        setCategories(response.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId,
    }));
  }, [categoryId]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            {categoryName ? `${categoryName} Products` : "All Products"}
          </h1>

          <p className="text-muted-foreground mt-2">
            Explore our latest collection
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {products.length} products
          </p>
        </div>
      </div>

      {/* Loading */}

      <div className="flex gap-8 items-start">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <Skeleton key={index} className="h-[450px] rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">No Products Found</h2>

                <p className="text-muted-foreground mt-2">
                  Try changing your filters.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && !loading && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
