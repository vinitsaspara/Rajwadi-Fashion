"use client";

import ReviewStars from "./ReviewStars";

export default function ReviewCard({
  review,
}) {
  return (
    <div className="border rounded-xl p-5">

      <div className="flex justify-between items-start">

  <div>

    <div className="flex items-center gap-3">

      <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">

        {review.user?.name
          ?.charAt(0)
          ?.toUpperCase()}

      </div>

      <div>

        <h3 className="font-semibold">
          {review.user?.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {new Date(
            review.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

    </div>

  </div>

  <ReviewStars
    rating={review.rating}
  />

</div>

      <p className="mt-4 text-sm leading-6">
        {review.comment}
      </p>

    </div>
  );
}