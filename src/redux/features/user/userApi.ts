import { api } from "../../api/apiSlice";

interface IRegistrationResponse {
  data: { accessToken: string };
  message: string;
  meta: null;
  statusCode: number;
  success: boolean;
}

interface IRegistrationUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILoginUserData {
  email: string;
  password: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegistrationResponse, IRegistrationUserData>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<IRegistrationResponse, ILoginUserData>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    getLoggedInUser: builder.query<object, object>({
      query: () => ({ url: "/users/get-logged-in-user" }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetLoggedInUserQuery,
  useLoginMutation,
} = bookApi;
