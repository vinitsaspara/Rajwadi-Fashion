import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  filters: {
    isFeatured: false,
    priceRange: { min: 0, max: 100000 },
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
      state.error = null;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetProducts: () => initialState,
  },
});

export const {
  setProducts,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  setCurrentPage,
  setFilters,
  setLoading,
  setError,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
