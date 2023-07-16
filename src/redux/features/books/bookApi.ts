import { IBookResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

interface uploadForm {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  imgUrl: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query<IBookResponse, string>({
      query: (url) => ({
        url: `/books/get-all-book?${url}`,
      }),
    }),
    myBook: builder.query<IBookResponse[], string>({
      query: (url) => ({
        url: `/books/my-book?${url}`,
      }),
    }),
    addBook: builder.mutation<IBookResponse, uploadForm>({
      query: (data) => ({
        url: "/books/add-book",
        method: "POST",
        body: data,
      }),
    }),
    deleteBook: builder.mutation<IBookResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/books/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-book"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useMyBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
} = bookApi;
