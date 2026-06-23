const ProductSizeSelector = ({
  sizes,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        Size
      </h3>

      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() =>
              setSelectedSize(size)
            }
            className={`w-12 h-12 border rounded-md ${
              selectedSize?.id === size.id
                ? "border-black bg-black text-white"
                : ""
            }`}
          >
            {size.size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;