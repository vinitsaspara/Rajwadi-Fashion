import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },

    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },

    addWishlistItem: (state, action) => {
      const exists = state.wishlist.find(
        (item) =>
          item.productId ===
          action.payload.productId
      );

      if (!exists) {
        state.wishlist.unshift(
          action.payload
        );
      }
    },

    removeWishlistItem: (
      state,
      action
    ) => {
      state.wishlist =
        state.wishlist.filter(
          (item) =>
            item.productId !==
            action.payload
        );
    },
  },
});

export const {
  setWishlist,
  setWishlistLoading,
  addWishlistItem,
  removeWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;