"use client";

import Link from "next/link";

import {
  Star,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

export default function RecentReviews({
  reviews = [],
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between p-6 border-b">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Reviews
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Latest customer feedback
          </p>

        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <Link href="/admin/reviews">
            View All
          </Link>
        </Button>

      </div>

      {reviews.length === 0 ? (

        <div className="py-16 text-center text-muted-foreground">
          No reviews available.
        </div>

      ) : (

        <div className="divide-y">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="p-6 hover:bg-muted/30 transition-colors"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold">
                    {review.user}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {review.product}
                  </p>

                </div>

                <div className="flex items-center gap-1">

                  {Array.from({
                    length: 5,
                  }).map((_, index) => (

                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />

                  ))}

                </div>

              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {review.comment}
              </p>

              <p className="text-xs text-muted-foreground mt-3">
                {review.date}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}