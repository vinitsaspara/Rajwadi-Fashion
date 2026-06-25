import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import addressReducer from "./slices/addressSlice"
import wishlistReducer from "./slices/wishlistSlice"

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  address: addressReducer,
  wishlist: wishlistReducer
});

const persistConfig = {
  key: "root",
  storage,

  whitelist: [
    "auth",
    "cart",
    "product",
    "category",
    "address",
    "wishlist"
  ],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);