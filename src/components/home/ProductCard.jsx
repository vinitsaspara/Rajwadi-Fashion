import { Heart } from "lucide-react";

export default function ProductCard({
  product,
}) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-72 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold mb-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center">
          <span className="font-bold">
            ₹{product.price}
          </span>

          <Heart
            size={20}
            className="cursor-pointer"
          />
        </div>

        <button className="w-full mt-4 bg-black text-white py-2 rounded-lg">
          Add To Cart
        </button>
      </div>
    </div>
  );
}