"use client";

import { useEffect, useState } from "react";

import Section from "@/components/common/Section";
import CategoryGrid from "@/components/category/CategoryGrid";

import { categoryService } from "@/services/category.service";

const CategoriesSection = () => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          await categoryService.getCategories();

        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Section title="Shop By Category">
        Loading...
      </Section>
    );
  }

  return (
    <Section
      title="Shop By Category"
      subtitle="Explore our collections"
    >
      <CategoryGrid
        categories={categories}
      />
    </Section>
  );
};

export default CategoriesSection;