"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function CategorySearch({
  value,
  onChange,
}) {
  return (
    <div className="relative max-w-md">

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
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search categories..."
        className="pl-10"
      />

    </div>
  );
}