"use client";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";

export default function ProductVariants({
  colors,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) {
  return (
    <>
      {/* Color */}

      <div className="mt-8">

        <h3 className="font-semibold mb-3">
          Color
        </h3>

        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onSelect={onColorChange}
        />

      </div>

      {/* Size */}

      <div className="mt-8">

        <h3 className="font-semibold mb-3">
          Size
        </h3>

        <SizeSelector
          sizes={
            selectedColor?.sizes || []
          }
          selectedSize={
            selectedSize
          }
          onSelect={
            onSizeChange
          }
        />

      </div>

      {/* Stock */}

      <div className="mt-5">

        {selectedSize ? (
          selectedSize.stock > 5 ? (
            <p className="text-green-600 font-medium">
              In Stock (
              {selectedSize.stock}
              )
            </p>
          ) : (
            <p className="text-orange-500 font-medium">
              Only{" "}
              {selectedSize.stock} Left
            </p>
          )
        ) : (
          <p className="text-muted-foreground">
            Please select a size
          </p>
        )}

      </div>
    </>
  );
}