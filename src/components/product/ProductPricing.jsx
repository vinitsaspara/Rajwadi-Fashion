"use client";

export default function ProductPricing({
  price,
  discountPrice,
}) {
  const originalPrice =
    Number(price);

  const finalPrice =
    Number(discountPrice);

  const discount =
    originalPrice > 0
      ? Math.round(
          ((originalPrice -
            finalPrice) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 flex-wrap">

        <span className="text-4xl font-bold">
          ₹{finalPrice}
        </span>

        {finalPrice < originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ₹{originalPrice}
            </span>

            <span className="text-green-600 font-semibold">
              {discount}% OFF
            </span>
          </>
        )}

      </div>
    </div>
  );
}