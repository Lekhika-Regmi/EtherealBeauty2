// src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',  // This is necessary for RTK Query
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),  // Adjust base URL for your API
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/data',  // Replace with your actual endpoint
    }),
    // You can add more endpoints like POST, PUT, DELETE here
  }),
});

export const { useGetDataQuery } = apiSlice; // Export hooks for the query
export default apiSlice;  // Export the slice
