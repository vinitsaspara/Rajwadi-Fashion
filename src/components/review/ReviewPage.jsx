"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  MessageSquare,
} from "lucide-react";

import {
  getReviews,
  deleteReview,
} from "@/services/review.service";

import ReviewCard from "./ReviewCard";
import ReviewEditDialog from "./ReviewEditDialog";

export default function ReviewPage() {
  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews =
    async () => {
      try {
        setLoading(true);

        const response =
          await getReviews();

        setReviews(
          response.reviews
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load reviews"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteReview(id);

        toast.success(
          "Review deleted successfully"
        );

        fetchReviews();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to delete review"
        );
      }
    };

  const handleEdit =
    (review) => {
      setSelectedReview(
        review
      );

      setDialogOpen(
        true
      );
    };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="max-w-5xl mx-auto py-24 flex flex-col items-center">

        <MessageSquare
          className="h-16 w-16 text-gray-400"
        />

        <h2 className="text-3xl font-bold mt-6">
          No Reviews Yet
        </h2>

        <p className="text-muted-foreground mt-2">
          You haven't reviewed any products.
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        My Reviews
      </h1>

      <div className="space-y-5">

        {reviews.map(
          (review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        )}

      </div>

      <ReviewEditDialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
        review={selectedReview}
        onSuccess={
          fetchReviews
        }
      />

    </div>
  );
}