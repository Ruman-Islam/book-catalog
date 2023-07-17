import ProductCard from "../components/common/ProductCard";
import Spinner from "../components/common/Spinner";
import { useGetWishListQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const WishList = () => {
  const { data, isLoading } = useGetWishListQuery("");

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.data?.wishList?.map((book: IBook) => {
            return <ProductCard key={book._id} book={book} />;
          })}

          {(data?.data?.wishList?.length as number) <= 0 && (
            <span className="m-5">No data found</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishList;
