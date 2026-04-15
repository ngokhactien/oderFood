import { configureStore } from "@reduxjs/toolkit";
import cartHeaderSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartHeaderSlice,
  },
});