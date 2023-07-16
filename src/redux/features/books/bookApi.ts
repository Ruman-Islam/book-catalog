import { IBookResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query<IBookResponse, string>({
      query: (url) => ({
        url: `/books/get-all-book?${url}`,
      }),
    }),
  }),
});

export const { useGetAllBookQuery } = bookApi;
