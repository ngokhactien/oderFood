import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authSlice from "./authSlice";
import productReducer from "./productSlice";
import tableProductReducer from "./tableFoodSlice";
import orderReducer from "./orderSlice";
import orderUiReducer from "./orderUiSlice";
import reservationReducer from "./reservationSlice";

const saved = localStorage.getItem("orderUI");

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    products: productReducer,
    tableProducts: tableProductReducer,
    order: orderReducer,
    orderUI: orderUiReducer, 
    reservation: reservationReducer,
  },
  preloadedState: {
    orderUI: saved ? JSON.parse(saved) : undefined,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("orderUI", JSON.stringify(state.orderUI));
});
