"use client";

import Link from "next/link";

import { FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyCategory() {
  return (
    <div className="flex flex-col items-center justify-center py-24 border rounded-xl bg-white shadow-sm">

      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">

        <FolderOpen className="h-10 w-10 text-muted-foreground" />

      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No Categories Found
      </h2>

      <p className="mt-2 text-muted-foreground text-center max-w-md">
        You haven't created any categories yet.
        Start by creating your first product category.
      </p>

      <Button
        asChild
        className="mt-8"
      >
        <Link href="/admin/categories/add">

          <Plus className="mr-2 h-4 w-4" />

          Add Category

        </Link>
      </Button>

    </div>
  );
}