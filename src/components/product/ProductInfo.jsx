"use client";

export default function ProductInfo({
  product,
}) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {product.isFeatured && (
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}

        {product.isBestSeller && (
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Best Seller
          </span>
        )}
      </div>

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <p className="text-sm text-muted-foreground mt-2">
        Category:
        <span className="font-medium ml-1">
          {product.category?.name}
        </span>
      </p>

      <p className="text-sm text-muted-foreground mt-3">
        SKU: {product.sku}
      </p>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-2">
          Description
        </h3>

        <p className="text-muted-foreground leading-7">
          {product.description}
        </p>
      </div>
    </div>
  );
}