"use client";

import { useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { toast } from "sonner";

import {
  addReview,
  updateReview,
  deleteReview,
} from "@/services/review.service";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import ReviewStars from "./ReviewStars";

import { Button } from "@/components/ui/button";

export default function ReviewSection({
  product,
  refreshProduct,
}) {
  const user = useSelector(
    (state) => state.auth.user
  );

  const [loading, setLoading] =
    useState(false);

  const myReview = useMemo(
    () =>
      product.reviews.find(
        (review) =>
          review.user?.id === user?.id
      ),
    [product.reviews, user]
  );

  const handleSubmit =
    async (data) => {
      try {
        setLoading(true);

        if (myReview) {
          await updateReview(
            myReview.id,
            {
              productId:
                product.id,
              ...data,
            }
          );

          toast.success(
            "Review updated"
          );
        } else {
          await addReview({
            productId:
              product.id,
            ...data,
          });

          toast.success(
            "Review added"
          );
        }

        refreshProduct();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async () => {
      try {
        setLoading(true);

        await deleteReview(
          myReview.id
        );

        toast.success(
          "Review deleted"
        );

        refreshProduct();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to delete review"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="mt-14">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-3 mt-3">

          <ReviewStars
            rating={Math.round(
              product.averageRating
            )}
          />

          <span className="font-medium">
            {Number(
              product.averageRating
            ).toFixed(1)}
          </span>

          <span className="text-muted-foreground">
            (
            {
              product.reviews.length
            }{" "}
            Reviews)
          </span>

        </div>

      </div>

      {/* Reviews */}

      <div className="space-y-4">

        {product.reviews.length ===
        0 ? (
          <p className="text-muted-foreground">
            No reviews yet.
          </p>
        ) : (
          product.reviews.map(
            (review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            )
          )
        )}

      </div>

      {/* Form */}

      {user && (
        <div className="mt-12 border rounded-xl p-6">

          <h3 className="text-xl font-semibold mb-6">

            {myReview
              ? "Edit Your Review"
              : "Write a Review"}

          </h3>

          <ReviewForm
            initialData={
              myReview
            }
            loading={
              loading
            }
            onSubmit={
              handleSubmit
            }
          />

          {myReview && (
            <Button
              variant="destructive"
              className="mt-4"
              disabled={
                loading
              }
              onClick={
                handleDelete
              }
            >
              Delete Review
            </Button>
          )}

        </div>
      )}
    </section>
  );
}