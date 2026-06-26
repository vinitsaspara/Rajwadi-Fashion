"use client";

import SearchResultCard from "./SearchResultCard";

export default function SearchDropdown({
  loading,
  products,
  query,
  onClose,
}) {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50">

      <div className="bg-white border rounded-xl shadow-xl max-h-[450px] overflow-y-auto">

        {loading ? (
          <div className="p-6 text-center text-muted-foreground">
            Searching...
          </div>
        ) : products.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No products found.
          </div>
        ) : (
          <div className="p-2 space-y-2">

            {products.map((product) => (
              <SearchResultCard
                key={product.id}
                product={product}
                onSelect={onClose}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}