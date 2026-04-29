import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authSlice from "./authSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    products: productReducer, // 👈 QUAN TRỌNG
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(store.getState().cart.items)
  );
});