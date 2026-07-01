"use client";

import Link from "next/link";

import { PackageSearch, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyProduct() {
  return (
    <div className="rounded-xl border border-dashed bg-white p-16">

      <div className="flex flex-col items-center text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">

          <PackageSearch className="h-10 w-10 text-muted-foreground" />

        </div>

        <h2 className="mt-6 text-2xl font-bold">
          No Products Found
        </h2>

        <p className="mt-2 max-w-md text-muted-foreground">
          You haven't created any products yet.
          Start by adding your first product.
        </p>

        <Button
          asChild
          className="mt-8"
        >

          <Link href="/admin/products/add">

            <Plus className="mr-2 h-4 w-4" />

            Add Product

          </Link>

        </Button>

      </div>

    </div>
  );
}