export interface IBook {
  _id: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  imgUrl: string;
  email: string;
  isRead?: boolean;
  reviews: [];
  __v: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBookResponse {
  data: IBook[];
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  statusCode: number;
  success: boolean;
}

export interface ISingleBookResponse {
  data: IBook;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  statusCode: number;
  success: boolean;
}

export interface IErrorResponse {
  data: {
    errorMessages: [];
    message: string;
    stack?: string;
    success: boolean;
  };
  status: number;
}
