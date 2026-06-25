import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  loading: false,
};

const addressSlice =
  createSlice({
    name: "address",

    initialState,

    reducers: {
      setAddresses: (
        state,
        action
      ) => {
        state.addresses =
          action.payload;
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
  setAddresses,
  setLoading,
} = addressSlice.actions;

export default addressSlice.reducer;