"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import Link from "next/link";

import { toast } from "sonner";

import { getProducts, deleteProduct } from "@/services/product.service";

import { Button } from "@/components/ui/button";

import ProductSearch from "@/components/admin/products/ProductSearch";

import ProductTable from "@/components/admin/products/ProductTable";

import ProductSkeleton from "@/components/admin/products/ProductSkeleton";

// import EmptyProduct from "@/components/admin/product/EmptyProduct";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        limit: 100,
      });

      setProducts(response.products);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-muted-foreground mt-2">Manage all products.</p>
        </div>

        <Button asChild>
          <Link href="/admin/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}

      <ProductSearch
        value={search}
        onChange={setSearch}
        totalProducts={products.length}
      />
      {/* Content */}

      {loading ? (
        <ProductSkeleton />
      ) : filteredProducts.length === 0 ? (
        // <EmptyProduct />
        <></>
      ) : (
        <ProductTable products={filteredProducts} onDelete={handleDelete} />
      )}
    </div>
  );
}
