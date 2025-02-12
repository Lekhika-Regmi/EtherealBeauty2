
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './redux/apiSlice';
import productsApi from './features/products/productsApi';
import orderApi from './features/orders/orderApi';
import cartReducer from './features/cart/cartSlice';
import {authApi} from './auth/authApi';  // Import auth API
import authReducer, { initializeAuth } from './auth/authSlice'; // Import auth slice
const store = configureStore({
  reducer: {
    cart: cartReducer, // Your cart slice reducer
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice
    [productsApi.reducerPath]: productsApi.reducer, // Products API slice
    [orderApi.reducerPath]: orderApi.reducer, // Order API slice
    [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware)
      .concat(apiSlice.middleware),  // Add middleware for RTK Query
});
store.dispatch(initializeAuth());
export default store;
