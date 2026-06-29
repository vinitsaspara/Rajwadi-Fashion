"use client";

import { Star } from "lucide-react";

export default function RatingFilter({
  value,
  onChange,
}) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Customer Rating
      </h3>

      <div className="space-y-3">

        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() =>
              onChange(
                value === rating
                  ? ""
                  : rating
              )
            }
            className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 transition ${
              value === rating
                ? "border-black bg-black text-white"
                : "hover:bg-muted"
            }`}
          >

            <div className="flex items-center gap-1">

              {Array.from({
                length: 5,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : value === rating
                      ? "text-white"
                      : "text-gray-300"
                  }
                />
              ))}

            </div>

            <span className="text-sm font-medium">
              & Up
            </span>

          </button>
        ))}

      </div>

    </div>
  );
}