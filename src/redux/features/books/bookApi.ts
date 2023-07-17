import {
  IBook,
  IBookResponse,
  ISingleBookResponse,
} from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

interface IUploadForm {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  imgUrl: string;
}

interface IUpdateForm {
  id: string;
  data: IUploadForm;
}

interface IAddReview {
  id: string;
  data: {
    review: string;
  };
}

interface IWishListResponse {
  data: {
    email: string;
    wishList: IBook[];
    createdAt: string;
    updatedAt: string;
    _id: string;
    id: string;
    __v: string;
  };
  message: string;
  meta: null;
  statusCode: number;
  success: boolean;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query<IBookResponse, string>({
      query: (url) => ({
        url: `/books/get-all-book?${url}`,
      }),
    }),
    myBook: builder.query<IBookResponse, string>({
      query: (url) => ({
        url: `/books/my-book?${url}`,
      }),
    }),
    addBook: builder.mutation<IBookResponse, IUploadForm>({
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
    getSingleBook: builder.query<ISingleBookResponse, string>({
      query: (id) => ({
        url: `/books/get-a-book/${id}`,
      }),
    }),
    updateBook: builder.mutation<IBookResponse, IUpdateForm>({
      query: ({ id, data }) => ({
        url: `/books/update-book/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addReview: builder.mutation<IBookResponse, IAddReview>({
      query: ({ id, data }) => ({
        url: `/books/add-review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    addWish: builder.mutation<IBookResponse, string>({
      query: (id) => ({
        url: `/wish/add-wish/${id}`,
        method: "PUT",
      }),
    }),
    getWishList: builder.query<IWishListResponse, string>({
      query: () => ({
        url: "/wish/get-wish-list",
      }),
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useMyBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useAddReviewMutation,
  useAddWishMutation,
  useGetWishListQuery,
} = bookApi;
