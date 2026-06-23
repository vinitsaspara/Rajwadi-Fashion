import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },

    addToCart: (state, action) => {
      const { productId, productName, color, size, quantity, price, image } = action.payload;
      
      // Check if item already exists
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: `${productId}-${color}-${size}`,
          productId,
          productName,
          color,
          size,
          quantity,
          price,
          image,
        });
      }

      // Recalculate totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      
      // Recalculate totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    updateCartItem: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      
      if (item) {
        item.quantity = quantity;
      }

      // Recalculate totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    clearCart: () => initialState,
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;