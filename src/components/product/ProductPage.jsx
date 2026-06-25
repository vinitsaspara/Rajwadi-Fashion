"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useSearchParams,
} from "next/navigation";

import { Search } from "lucide-react";

import { toast } from "sonner";

import {
  getProducts,
} from "@/services/product.service";

import {
  setProducts,
  setLoading,
} from "@/store/slices/productSlice";

import ProductCard from "./ProductCard";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import {
  Button,
} from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function ProductPage() {
  const dispatch =
    useDispatch();

  const searchParams =
    useSearchParams();

  const categoryId =
    searchParams.get(
      "categoryId"
    );

  const categoryName =
    searchParams.get(
      "categoryName"
    );

  const {
    products,
    loading,
    totalPages,
  } = useSelector(
    (state) => state.product
  );

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedSearch(
          search
        );
      }, 500);

    return () =>
      clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    categoryId,
    debouncedSearch,
  ]);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          dispatch(
            setLoading(true)
          );

          const response =
            await getProducts({
              page:
                currentPage,
              categoryId,
              search:
                debouncedSearch,
            });

          dispatch(
            setProducts(
              response
            )
          );
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              "Failed to load products"
          );
        } finally {
          dispatch(
            setLoading(false)
          );
        }
      };

    fetchProducts();
  }, [
    currentPage,
    categoryId,
    debouncedSearch,
    dispatch,
  ]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            {categoryName
              ? `${categoryName} Products`
              : "All Products"}
          </h1>

          <p className="text-muted-foreground mt-2">
            Explore our latest collection
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full md:w-80">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="pl-10"
          />

        </div>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {Array.from({
            length: 8,
          }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className="h-[450px] rounded-xl"
              />
            )
          )}

        </div>
      ) : products.length ===
        0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            No Products Found
          </h2>

          <p className="text-muted-foreground mt-2">
            Try another search
            or category.
          </p>

        </div>
      ) : (
        <>
          {/* Product Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map(
              (
                product
              ) => (
                <ProductCard
                  key={
                    product.id
                  }
                  product={
                    product
                  }
                />
              )
            )}

          </div>

          {/* Pagination */}

          {totalPages >
            1 && (
            <div className="flex justify-center items-center gap-4 mt-10">

              <Button
                variant="outline"
                disabled={
                  currentPage ===
                  1
                }
                onClick={() =>
                  setCurrentPage(
                    (
                      prev
                    ) =>
                      prev -
                      1
                  )
                }
              >
                Previous
              </Button>

              <span className="font-medium">
                Page{" "}
                {
                  currentPage
                }{" "}
                of{" "}
                {
                  totalPages
                }
              </span>

              <Button
                variant="outline"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (
                      prev
                    ) =>
                      prev +
                      1
                  )
                }
              >
                Next
              </Button>

            </div>
          )}

        </>
      )}

    </section>
  );
}