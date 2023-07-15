import { IResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query<IResponse, undefined>({
      query: () => ({ url: "/books/get-all-book" }),
    }),
  }),
});

export const { useGetAllBookQuery } = bookApi;
