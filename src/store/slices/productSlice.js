import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
};

const productSlice =
  createSlice({
    name: "product",

    initialState,

    reducers: {
      setProducts: (
        state,
        action
      ) => {
        state.products =
          action.payload.products;

        state.total =
          action.payload.total;

        state.page =
          action.payload.page;

        state.totalPages =
          action.payload.totalPages;
      },

      setLoading: (
        state,
        action
      ) => {
        state.loading =
          action.payload;
      },
    },
  });

export const {
  setProducts,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;