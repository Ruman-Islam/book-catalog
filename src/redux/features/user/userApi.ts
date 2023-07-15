import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<object, object>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    getLoggedInUser: builder.query<object, object>({
      query: () => ({ url: "/users/get-logged-in-user" }),
    }),
  }),
});

export const { useRegisterMutation, useGetLoggedInUserQuery } = bookApi;
