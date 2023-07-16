import { IBook } from "../types/globalTypes";
import { useGetAllBookQuery } from "../redux/features/books/bookApi";
import Spinner from "../components/common/Spinner";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  const { data, isLoading } = useGetAllBookQuery("");

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/05/Pink-book-cover-by-Maggie-de-Vos-via-Behance.jpg?w=720"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Before they sold out
                <br className="hidden lg:inline-block" />
                readymade gluten
              </h1>
              <p className="mb-8 leading-relaxed">
                Copper mug try-hard pitchfork pour-over freegan heirloom neutra
                air plant cold-pressed tacos poke beard tote bag. Heirloom echo
                park mlkshk tote bag selvage hot chicken authentic tumeric
                truffaut hexagon try-hard chambray.
              </p>
            </div>
          </div>
        </section>
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
