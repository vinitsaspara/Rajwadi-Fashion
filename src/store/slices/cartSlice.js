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

    clearCart: () => initialState,
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;