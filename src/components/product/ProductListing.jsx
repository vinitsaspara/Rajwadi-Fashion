"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import ProductGrid from "./ProductGrid";

import { productService } from "@/services/product.service";

const ProductListing = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =
        await productService.getProducts();

      setProducts(response.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-8">
        All Products
      </h1>

      <ProductGrid products={products} />
    </Container>
  );
};

export default ProductListing;