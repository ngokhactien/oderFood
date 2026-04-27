import { createSlice } from "@reduxjs/toolkit";

// 🔥 lấy từ localStorage khi reload
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGIN
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    // 🔥 UPDATE ADDRESS (QUAN TRỌNG)
    updateAddresses: (state, action) => {
      if (state.user) {
        state.user.addresses = action.payload;

        // 🔥 update lại localStorage luôn
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout, updateAddresses } =
  authSlice.actions;

export default authSlice.reducer;