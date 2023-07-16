import { api } from "../../api/apiSlice";

interface IRegistrationResponse {
  data: { accessToken: string };
  message: string;
  meta: null;
  statusCode: number;
  success: boolean;
}

interface IRegistrationUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegistrationResponse, IRegistrationUser>({
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
