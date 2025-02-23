import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fed-storefront-backend-kusalana.onrender.com";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "categories",
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getOrders: builder.query({
      query: () => "orders",
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "orders",
        method: "POST",
        body: orderData,
      }),
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "products",
        method: "POST",
        body: productData,
      }),
    }),

    updateInventory: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `products/${productId}/update-inventory`, 
        method: "PATCH",
        body: { quantity },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useCreateProductMutation,
  useUpdateInventoryMutation,  // Export the updateInventory hook
} = Api;
