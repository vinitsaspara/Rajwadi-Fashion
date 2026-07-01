"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function ProductSearch({
  value,
  onChange,
  totalProducts,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border bg-white p-5 shadow-sm">

      {/* Left */}

      <div>

        <h2 className="text-lg font-semibold">
          Product List
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Total Products :{" "}
          <span className="font-semibold text-black">
            {totalProducts}
          </span>
        </p>

      </div>

      {/* Search */}

      <div className="relative w-full md:w-80">

        <Search
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            h-4
            w-4
            text-muted-foreground
          "
        />

        <Input
          placeholder="Search product..."
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="pl-10"
        />

      </div>

    </div>
  );
}