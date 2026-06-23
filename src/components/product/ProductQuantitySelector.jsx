const ProductQuantitySelector = ({
  quantity,
  setQuantity,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        Quantity
      </h3>

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setQuantity((prev) =>
              Math.max(1, prev - 1)
            )
          }
          className="border px-4 py-2"
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          onClick={() =>
            setQuantity((prev) => prev + 1)
          }
          className="border px-4 py-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;