"use client";

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import FeaturedFilter from "./FeaturedFilter";
import SortSelect from "./SortSelect";
import ActiveFilters from "./ActiveFilters";

import { Separator } from "@/components/ui/separator";

export default function FilterSidebar({
  filters,
  setFilters,
  categories,
}) {
  const handleRemoveFilter = (key) => {
    switch (key) {
      case "categoryId":
        setFilters((prev) => ({
          ...prev,
          categoryId: "",
        }));
        break;

      case "price":
        setFilters((prev) => ({
          ...prev,
          minPrice: "",
          maxPrice: "",
        }));
        break;

      case "rating":
        setFilters((prev) => ({
          ...prev,
          rating: "",
        }));
        break;

      case "featured":
        setFilters((prev) => ({
          ...prev,
          featured: false,
        }));
        break;

      case "bestSeller":
        setFilters((prev) => ({
          ...prev,
          bestSeller: false,
        }));
        break;

      case "inStock":
        setFilters((prev) => ({
          ...prev,
          inStock: false,
        }));
        break;

      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setFilters({
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      featured: false,
      bestSeller: false,
      inStock: false,
      sort: "newest",
    });
  };

  return (
   <aside
  className="
    w-72
    shrink-0
    rounded-xl
    border
    bg-white
    p-6
    space-y-6
    shadow-sm
    sticky
    top-24
    h-fit
  "
>

      <h2 className="text-2xl font-bold">
        Filters
      </h2>

      <ActiveFilters
        filters={filters}
        categories={categories}
        onRemove={handleRemoveFilter}
        onClear={handleClearFilters}
      />

      <Separator />

      <CategoryFilter
        value={filters.categoryId}
        onChange={(categoryId) =>
          setFilters((prev) => ({
            ...prev,
            categoryId,
          }))
        }
      />

      <Separator />

      <PriceFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onMinChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            minPrice: value,
          }))
        }
        onMaxChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            maxPrice: value,
          }))
        }
      />

      <Separator />

      <RatingFilter
        value={filters.rating}
        onChange={(rating) =>
          setFilters((prev) => ({
            ...prev,
            rating,
          }))
        }
      />

      <Separator />

      <AvailabilityFilter
        value={filters.inStock}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            inStock: value,
          }))
        }
      />

      <Separator />

      <FeaturedFilter
        featured={filters.featured}
        bestSeller={filters.bestSeller}
        onFeaturedChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            featured: value,
          }))
        }
        onBestSellerChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            bestSeller: value,
          }))
        }
      />

      <Separator />

      <SortSelect
        value={filters.sort}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            sort: value,
          }))
        }
      />

    </aside>
  );
}