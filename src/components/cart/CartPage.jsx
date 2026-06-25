"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { clearCart } from "@/services/cart.service";

import CartSummary from "./CartSummary";

import { getCart } from "@/services/cart.service";
import {
  setCart,
  setLoading,
   updateQuantity,
} from "@/store/slices/cartSlice";

import CartItem from "./CartItem";

import { updateCartItem, removeCartItem } from "@/services/cart.service";

export default function CartPage() {
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);


  const fetchCart = async () => {
    try {
      dispatch(setLoading(true));

      const response = await getCart();

      dispatch(setCart(response.cart));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      }),
    );

    try {
      await updateCartItem(item.id, item.quantity + 1);
    } catch (error) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity,
        }),
      );

      toast.error("Failed to update quantity");
    }
  };

const handleDecrease =
  async (item) => {

    if (item.quantity <= 1)
      return;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity:
          item.quantity - 1,
      })
    );

    try {

      await updateCartItem(
        item.id,
        item.quantity - 1
      );

    } catch (error) {

      dispatch(
        updateQuantity({
          id: item.id,
          quantity:
            item.quantity,
        })
      );

      toast.error(
        "Failed to update quantity"
      );
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);

      toast.success("Item removed");

      fetchCart();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto py-10 px-4">Loading...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">Your Cart Is Empty</h2>

        <p className="text-muted-foreground mt-2">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  const handleClearCart =
  async () => {
    try {

      await clearCart();

      dispatch(
        setCart([])
      );

      toast.success(
        "Cart cleared"
      );

    } catch (error) {

      toast.error(
        "Failed to clear cart"
      );

    }
  };

  

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="lg:col-span-2 space-y-4">

  {cart.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onIncrease={
        handleIncrease
      }
      onDecrease={
        handleDecrease
      }
      onRemove={
        handleRemove
      }
    />
  ))}

</div>

<CartSummary
  cart={cart}
  onClearCart={
    handleClearCart
  }
/>
    </div>
  );
}
