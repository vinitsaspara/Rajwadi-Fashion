"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReviewRating from "./ReviewRating";

export default function ProductReviewCard({
  review,
}) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">

      <div className="flex items-start gap-4">

        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-base font-semibold">
            {review.user?.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

            <div>

              <h3 className="font-semibold text-lg">
                {review.user?.name ||
                  "Anonymous"}
              </h3>

              <ReviewRating
                rating={
                  review.rating
                }
              />

            </div>

            <span className="text-sm text-muted-foreground">

              {new Date(
                review.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

          <p className="mt-4 leading-7 text-muted-foreground">

            {review.comment}

          </p>

        </div>

      </div>

    </div>
  );
}