"use client";

import { useEffect, useState } from "react";

import Section from "@/components/common/Section";
import ProductGrid from "@/components/product/ProductGrid";

import { productService } from "@/services/product.service";

const FeaturedProductsSection = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await productService.getFeaturedProducts();

        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Section title="Featured Products">
        Loading...
      </Section>
    );
  }

  return (
    <Section
      title="Featured Products"
      subtitle="Handpicked styles for you"
    >
      <ProductGrid
        products={products}
      />
    </Section>
  );
};

export default FeaturedProductsSection;