import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage,

  whitelist: [
    "auth",
    "cart",
    "wishlist",
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