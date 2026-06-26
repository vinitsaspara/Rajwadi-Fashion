"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Star } from "lucide-react";

import { updateReview } from "@/services/review.service";

export default function ReviewEditDialog({
  open,
  onOpenChange,
  review,
  onSuccess,
}) {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await updateReview(
          review.id,
          {
            rating,
            comment,
          }
        );

        toast.success(
          "Review updated successfully"
        );

        onSuccess();

        onOpenChange(false);

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update review"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Edit Review
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6">

          {/* Rating */}

          <div>

            <label className="font-medium">
              Rating
            </label>

            <div className="flex gap-2 mt-3">

              {[1,2,3,4,5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setRating(star)
                    }
                  >
                    <Star
                      className={`h-8 w-8 transition ${
                        star <= rating
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
              value={comment}
              onChange={(e)=>
                setComment(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              className="mt-2"
            />

          </div>

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {
              loading
                ? "Updating..."
                : "Update Review"
            }
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}