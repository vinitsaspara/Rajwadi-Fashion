"use client";

import Link from "next/link";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import ReviewRating from "./ReviewRating";

export default function ReviewCard({
  review,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">

      <CardContent className="p-6">

        <div className="flex flex-col md:flex-row gap-6">

          {/* Product Image */}

          <Link
            href={`/products/${review.product.id}`}
            className="shrink-0"
          >
            <img
              src={
                review.product.colors?.[0]
                  ?.images?.[0]
              }
              alt={review.product.name}
              className="h-28 w-28 rounded-lg object-cover border"
            />
          </Link>

          {/* Review Details */}

          <div className="flex-1">

            <Link
              href={`/products/${review.product.id}`}
            >
              <h2 className="text-xl font-semibold hover:text-primary transition">
                {review.product.name}
              </h2>
            </Link>

            <div className="mt-2">
              <ReviewRating
                rating={review.rating}
              />
            </div>

            <p className="mt-4 text-muted-foreground leading-7">
              {review.comment}
            </p>

            <p className="text-sm text-muted-foreground mt-4">
              Reviewed on{" "}
              {new Date(
                review.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          {/* Actions */}

          <div className="flex md:flex-col gap-2">

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onEdit(review)
              }
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                onDelete(review.id)
              }
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}