import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCategories,
  setLoading,
} = categorySlice.actions;

export default categorySlice.reducer;