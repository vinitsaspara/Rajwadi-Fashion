"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function CategoryCard({
  category,
}) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">

      <Link
        href={`/products?categoryId=${category.id}&categoryName=${category.name}`}
      >
        <div className="relative h-72 overflow-hidden">

          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/20" />

        </div>

        <CardContent className="p-5">

          <h3 className="text-xl font-semibold">
            {category.name}
          </h3>

          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {category.description}
          </p>

          <div className="flex items-center gap-2 mt-4 font-medium">

            Shop Now

            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />

          </div>

        </CardContent>
      </Link>

    </Card>
  );
}