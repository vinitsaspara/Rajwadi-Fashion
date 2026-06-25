"use client";

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() =>
            onSelect(color)
          }
          className={`px-4 py-2 border rounded-lg transition ${
            selectedColor?.id ===
            color.id
              ? "border-black bg-black text-white"
              : "border-gray-300"
          }`}
        >
          {color.colorName}
        </button>
      ))}

    </div>
  );
}