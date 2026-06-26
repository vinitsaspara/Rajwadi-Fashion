"use client";

import { useEffect, useState } from "react";

import { Star } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { addReview } from "@/services/review.service";

export default function ReviewForm({
  productId,
  refreshProduct,
}) {
  const [rating, setRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [hover, setHover] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!rating) {
        toast.error(
          "Please select rating"
        );
        return;
      }

      if (!comment.trim()) {
        toast.error(
          "Please enter comment"
        );
        return;
      }

      try {
        setLoading(true);

        await addReview({
          productId,
          rating,
          comment,
        });

        toast.success(
          "Review added successfully"
        );

        setRating(0);
        setComment("");

        if (refreshProduct) {
          refreshProduct();
        }
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to submit review"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="border rounded-xl p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Write a Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Rating */}

        <div>

          <label className="font-medium">
            Rating
          </label>

          <div className="flex gap-2 mt-3">

            {[1, 2, 3, 4, 5].map(
              (star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() =>
                    setHover(star)
                  }
                  onMouseLeave={() =>
                    setHover(0)
                  }
                  onClick={() =>
                    setRating(star)
                  }
                >
                  <Star
                    className={`h-8 w-8 transition ${
                      (hover || rating) >=
                      star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              )
            )}

          </div>

        </div>

        {/* Comment */}

        <div>

          <label className="font-medium">
            Comment
          </label>

          <Textarea
            rows={5}
            className="mt-2"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
          />

        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </Button>

      </form>

    </div>
  );
}