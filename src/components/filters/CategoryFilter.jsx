"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/services/category.service";

import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

export default function CategoryFilter({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.categories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold">Categories</h3>

        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Categories</h3>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={value === category.id}
              onCheckedChange={() =>
                onChange(value === category.id ? "" : category.id)
              }
            />

            <Label htmlFor={category.id} className="cursor-pointer">
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
