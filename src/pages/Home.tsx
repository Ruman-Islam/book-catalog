import { IBook } from "../types/globalTypes";
import { useGetAllBookQuery } from "../redux/features/books/bookApi";
import Spinner from "../components/common/Spinner";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.data?.slice(0, 10).map((book: IBook) => {
            return <ProductCard key={book._id} book={book} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
