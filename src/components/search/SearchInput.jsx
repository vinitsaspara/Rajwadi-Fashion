"use client";

import { useEffect, useRef, useState } from "react";

import { Search } from "lucide-react";

import { useRouter } from "next/navigation";

import { searchProducts } from "@/services/product.service";

import SearchDropdown from "./SearchDropdown";

export default function SearchInput() {
  const router = useRouter();

  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);

        const response = await searchProducts(query, 6);

        setProducts(response.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);

    setProducts([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          value={query}
          placeholder="Search products..."
          className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>

      <SearchDropdown
        loading={loading}
        products={products}
        query={query}
        onClose={() => {
          setProducts([]);
          setQuery("");
        }}
      />
    </div>
  );
}
