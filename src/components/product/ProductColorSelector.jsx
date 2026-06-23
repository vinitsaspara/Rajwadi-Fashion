const ProductColorSelector = ({
  colors,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        Color
      </h3>

      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() =>
              setSelectedColor(color)
            }
            className={`px-4 py-2 border rounded-md ${
              selectedColor?.id === color.id
                ? "border-black bg-black text-white"
                : ""
            }`}
          >
            {color.colorName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;