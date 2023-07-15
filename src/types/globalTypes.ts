export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imgUrl: string;
  reviews: [];
}

export interface IResponse {
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
