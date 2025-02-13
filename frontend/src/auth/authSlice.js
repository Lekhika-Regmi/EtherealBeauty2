import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    customerId: null,
    vendorId: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);

      // Store associated IDs based on role by extracting it from the user object.
      const associatedId = action.payload.user.associatedId;
      if (action.payload.user.role === 'customer' && associatedId) {
        state.customerId = associatedId;
        localStorage.setItem("customerId", associatedId.toString()); // Ensure it's a string
      } else if (action.payload.user.role === 'vendor' && associatedId) {
        state.vendorId = associatedId;
        localStorage.setItem("vendorId", associatedId.toString());
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.customerId = null;
      state.vendorId = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("customerId");
      localStorage.removeItem("vendorId");
    },
    initializeAuth: (state) => {
      state.user = JSON.parse(localStorage.getItem("user")) || null;
      state.token = localStorage.getItem("token") || null;
      state.customerId = localStorage.getItem("customerId") || null;
      state.vendorId = localStorage.getItem("vendorId") || null;
    },
  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
