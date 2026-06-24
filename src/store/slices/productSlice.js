import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setProducts,
  setProduct,
  setLoading,
} = productSlice.actions;

export default productSlice.reducer;