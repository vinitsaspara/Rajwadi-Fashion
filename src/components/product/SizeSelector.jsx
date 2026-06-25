"use client";

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() =>
            onSelect(size)
          }
          className={`h-10 w-10 border rounded-md text-sm font-medium transition ${
            selectedSize?.id ===
            size.id
              ? "bg-black text-white border-black"
              : "border-gray-300"
          }`}
        >
          {size.size}
        </button>
      ))}

    </div>
  );
}