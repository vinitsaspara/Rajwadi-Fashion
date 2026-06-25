import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (
      state,
      action
    ) => {
      state.cart =
        action.payload;
    },

    setLoading: (
      state,
      action
    ) => {
      state.loading =
        action.payload;
    },

    updateQuantity: (
      state,
      action
    ) => {
      const item =
        state.cart.find(
          (cartItem) =>
            cartItem.id ===
            action.payload.id
        );

      if (item) {
        item.quantity =
          action.payload.quantity;
      }
    },

    addCartItem: (
      state,
      action
    ) => {
      const existingItem =
        state.cart.find(
          (item) =>
            item.productId ===
              action.payload.productId &&
            item.color ===
              action.payload.color &&
            item.size ===
              action.payload.size
        );

      if (
        existingItem
      ) {
        existingItem.quantity +=
          action.payload.quantity;
      } else {
        state.cart.push(
          action.payload
        );
      }
    },
  },
});

export const {
  setCart,
  setLoading,
  updateQuantity,
  addCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;