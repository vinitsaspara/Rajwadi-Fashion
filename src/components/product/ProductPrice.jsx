const ProductPrice = ({
  price,
  discountedPrice,
}) => {
  const hasDiscount =
    discountedPrice &&
    discountedPrice < price;

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">
        ₹{hasDiscount
          ? discountedPrice
          : price}
      </span>

      {hasDiscount && (
        <>
          <span className="line-through text-gray-400">
            ₹{price}
          </span>

          <span className="text-green-600 text-sm">
            {Math.round(
              ((price - discountedPrice) /
                price) *
                100
            )}
            % OFF
          </span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;