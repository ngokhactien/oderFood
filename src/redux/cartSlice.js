import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.option === product.option
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.option === action.payload.option
          )
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.option === action.payload.option
      );
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.option === action.payload.option
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // 🔥 QUAN TRỌNG
    updateQuantity: (state, action) => {
      const { id, option, quantity } = action.payload;

      const item = state.items.find(
        (i) => i.id === id && i.option === option
      );

      if (!item) return;

      // ❗ validate
      if (isNaN(quantity) || quantity < 1) {
        item.quantity = 1;
      } else {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    loadCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeItem,
  increaseQty,
  decreaseQty,
  updateQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;