"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { getProductById } from "@/services/product.service";
import ReviewSection from "@/components/review/ReviewSection";

import ProductImageGallery from "./ProductImageGallery";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import {
  addToCart,
} from "@/services/cart.service";

import {
  useDispatch,
} from "react-redux";

import {
  addCartItem,
} from "@/store/slices/cartSlice";

import {
  Heart,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";

import {
  addWishlistItem,
  removeWishlistItem,
} from "@/store/slices/wishlistSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const dispatch =
  useDispatch();

const wishlist =
  useSelector(
    (state) =>
      state.wishlist.wishlist
  );

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [
  wishlistLoading,
  setWishlistLoading,
] = useState(false);

const fetchProduct = async () => {
  try {
    setLoading(true);

    const response =
      await getProductById(id);

    setProduct(response.product);

    const firstColor =
      response.product.colors?.[0];

    setSelectedColor(firstColor || null);

    setSelectedSize(
      firstColor?.sizes?.[0] || null
    );

    setMainImage(
      firstColor?.images?.[0] || ""
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to load product"
    );
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchProduct();
}, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  const isWishlisted =
  wishlist.some(
    (item) =>
      item.productId ===
      product.id
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);

    setSelectedSize(color.sizes?.[0]);

    setMainImage(color.images?.[0]);
  };

  const increaseQuantity = () => {
    if (
  selectedSize &&
  quantity < selectedSize.stock
) {
  setQuantity(quantity + 1);
}
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart =
  async () => {
    try {

      if (!selectedSize) {
  toast.error(
    "Please select size"
  );

  const handleWishlist =
  async () => {
    try {
      setWishlistLoading(
        true
      );

      if (
        isWishlisted
      ) {
        await removeFromWishlist(
          product.id
        );

        dispatch(
          removeWishlistItem(
            product.id
          )
        );

        toast.success(
          "Removed from wishlist"
        );
      } else {
        const response =
          await addToWishlist(
            product.id
          );

        dispatch(
          addWishlistItem({
            ...response.wishlist,
            product,
          })
        );

        toast.success(
          "Added to wishlist"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Wishlist failed"
      );
    } finally {
      setWishlistLoading(
        false
      );
    }
  };

  return;
}

      const payload = {
        productId:
          product.id,

        color:
          selectedColor.colorName,

        size:
          selectedSize.size,

        quantity,
      };

      const response =
  await addToCart(payload);

dispatch(
  addCartItem({
    id:
      response.cartItem?.id ||
      Date.now(),

    productId:
      product.id,

    color:
      selectedColor.colorName,

    size:
      selectedSize.size,

    quantity,

    product,
  })
);

      toast.success(
        "Product added to cart"
      );

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to add cart"
      );

    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ProductImageGallery
            images={product.colors?.[0]?.images || []}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />

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
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <p className="text-sm text-muted-foreground mt-2">
              Category:
              <span className="font-medium ml-1">{product.category.name}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              SKU: {product.sku}
            </p>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Description</h3>

              <p className="text-muted-foreground leading-7">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">₹{product.discountPrice}</span>

            <span className="text-xl text-muted-foreground line-through">
              ₹{product.price}
            </span>

            <span className="text-green-600 font-semibold">
              {Math.round(
                ((Number(product.price) - Number(product.discountPrice)) /
                  Number(product.price)) *
                  100,
              )}
              % OFF
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">Color</h3>

          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={handleColorChange}
          />
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">Size</h3>

          <SizeSelector
            sizes={selectedColor?.sizes || []}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
        </div>

        <div className="mt-4">
         {selectedSize ? (
  selectedSize.stock > 5 ? (
    <p className="text-green-600 font-medium">
      In Stock ({selectedSize.stock})
    </p>
  ) : (
    <p className="text-orange-500 font-medium">
      Only {selectedSize.stock} Left
    </p>
  )
) : (
  <p className="text-muted-foreground">
    Please select a size
  </p>
)}
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">Quantity</h3>

          <div className="flex items-center gap-4">
            <button
              onClick={decreaseQuantity}
              className="h-10 w-10 border rounded-md"
            >
              -
            </button>

            <span className="font-semibold text-lg">{quantity}</span>

            <button
              onClick={increaseQuantity}
              className="h-10 w-10 border rounded-md"
            >
              +
            </button>
          </div>
        </div>

        

        <div className="flex gap-3 mt-8">
          <Button className="flex-1" onClick={handleAddToCart}>
            Add To Cart
          </Button>

          <Button
  variant="outline"
  size="icon"
  disabled={
    wishlistLoading
  }
  onClick={
    handleWishlist
  }
>
  <Heart
  className={`transition-all duration-300 hover:scale-110 ${
    isWishlisted
      ? "fill-red-500 text-red-500"
      : ""
  }`}
/>
</Button>
        </div>

        <Button variant="outline" className="w-full h-12 mt-3" size="lg">
          Buy Now
        </Button>
      </div>

      <ReviewSection
  product={product}
  refreshProduct={fetchProduct}
/>
    </div>
  );
}
