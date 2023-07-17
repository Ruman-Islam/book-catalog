import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const production = "https://book-catalog-backend-delta.vercel.app/api/v1";
const development = "http://localhost:5000/api/v1";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: development,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("x-auth-token");
      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["review", "delete-book"],
  endpoints: () => ({}),
});
