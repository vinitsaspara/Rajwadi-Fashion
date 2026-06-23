import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((wishItem) => wishItem.id === item.id);
      if (!exists) {
        state.items.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    clearWishlist: () => initialState,
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;