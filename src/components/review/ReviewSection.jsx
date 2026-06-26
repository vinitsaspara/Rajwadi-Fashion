"use client";

import ReviewForm from "./ReviewForm";
import ProductReviewCard from "./ProductReviewCard";
import ReviewRating from "./ReviewRating";

export default function ReviewSection({
  product,
  refreshProduct,
}) {
  const reviews =
    product.reviews || [];

  const averageRating =
    Number(
      product.averageRating || 0
    );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">

      {/* Header */}

      <div className="mb-10">

        <h2 className="text-3xl font-bold">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-3 mt-3">

          <ReviewRating
            rating={Math.round(
              averageRating
            )}
            size={22}
          />

          <span className="font-semibold text-lg">
            {averageRating.toFixed(
              1
            )}
          </span>

          <span className="text-muted-foreground">
            (
            {reviews.length}
            {" "}
            Review
            {reviews.length !== 1
              ? "s"
              : ""}
            )
          </span>

        </div>

      </div>

      {/* Review Form */}

      <ReviewForm
        productId={product.id}
        refreshProduct={
          refreshProduct
        }
      />

      {/* Reviews */}

      <div className="mt-12">

        {reviews.length ===
        0 ? (
          <div className="border rounded-xl py-16 text-center">

            <h3 className="text-2xl font-semibold">

              No Reviews Yet

            </h3>

            <p className="text-muted-foreground mt-2">

              Be the first customer to review this product.

            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {reviews.map(
              (review) => (
                <ProductReviewCard
                  key={
                    review.id
                  }
                  review={
                    review
                  }
                />
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}