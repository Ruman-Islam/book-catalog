import ProductCard from "../components/common/ProductCard";
import Spinner from "../components/common/Spinner";
import { useGetReadListQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const ReadList = () => {
  const { data, isLoading } = useGetReadListQuery("", {
    pollingInterval: 500,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data?.data?.readingList?.map((book: IBook) => {
              return <ProductCard key={book._id} book={book} />;
            })}
            {(data?.data?.readingList?.length as number) <= 0 && (
              <span className="m-5">No data found</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReadList;
