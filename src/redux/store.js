import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authSlice from "./authSlice";
import productReducer from "./productSlice";
import tableProductReducer from "./tableFoodSlice";
import orderReducer from "./orderSlice";
import orderUiReducer from "./orderUiSlice";
// category client
import menuCategoryReducer from "./categorySlice";
import commentReducer from "./commentSlice";
//check order client
import checkoutReducer from "./checkoutSlice";

//admin
import reservationReducer from "./admin/reservation/reservationSlice";
import usersReducer from "./admin/users/userSlice";
import adminProductReducer from "./admin/products/adminProductSlice";
import categoryReducer from "./admin/category/categorySlice";
import orderManagementReducer from "./admin/order/orderManagementSlice";
import revenueReducer from "./admin/revenue/revenueSlice";

const saved = localStorage.getItem("orderUI");

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    products: productReducer,
    tableProducts: tableProductReducer,
    order: orderReducer,
    orderUI: orderUiReducer,
    menuCategories: menuCategoryReducer,
    comments: commentReducer,
    checkout: checkoutReducer, // create order checkout

    // admin
    reservations: reservationReducer, //đặt bàn admin
    users: usersReducer,
    adminProducts: adminProductReducer,
    categories: categoryReducer, // mục lục
    adminOrders: orderManagementReducer, // quản lý order
    adminRevenue: revenueReducer, //doanh thu
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
