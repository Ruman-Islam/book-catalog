import ProductCard from "../components/common/ProductCard";
import Spinner from "../components/common/Spinner";
import { useGetAllBookQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.data?.map((book: IBook) => {
            return <ProductCard key={book._id} book={book} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
