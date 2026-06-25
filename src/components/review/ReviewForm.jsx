"use client";

import { useState } from "react";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

export default function ReviewForm({
  initialData,
  onSubmit,
  loading,
}) {
  const [rating, setRating] = useState(
    initialData?.rating || 5
  );

  const [comment, setComment] =
    useState(
      initialData?.comment || ""
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      rating,
      comment,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Rating */}

      <div>

        <p className="font-medium mb-3">
          Rating
        </p>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                type="button"
                key={star}
                onClick={() =>
                  setRating(star)
                }
              >
                <Star
                  size={28}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            )
          )}

        </div>

      </div>

      {/* Comment */}

      <div>

        <p className="font-medium mb-3">
          Review
        </p>

        <Textarea
          rows={5}
          value={comment}
          placeholder="Write your review..."
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
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Review"
          : "Submit Review"}
      </Button>
    </form>
  );
}