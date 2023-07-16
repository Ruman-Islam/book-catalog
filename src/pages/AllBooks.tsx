import { useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Spinner from "../components/common/Spinner";
import { useGetAllBookQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const [searchQuery, setSearchQuery] = useState({
    queryString: "",
    genre: "",
  });

  const constructUrl = () => {
    let url = "";
    if (searchQuery.genre && searchQuery.queryString) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}`;
    } else if (searchQuery.genre) {
      url = `genre=${searchQuery.genre}`;
    } else if (searchQuery.queryString) {
      url = `searchTerm=${searchQuery.queryString}`;
    }
    return url;
  };

  const url = constructUrl();

  const { data, isLoading } = useGetAllBookQuery(url);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="mb-5 flex justify-end w-full">
          <div className="flex gap-x-1.5">
            <div>
              <input
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    queryString: e.target.value,
                  })
                }
                type="text"
                id="name"
                name="name"
                placeholder="Search..."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex items-center">
              <div className="relative">
                <select
                  onChange={(e) =>
                    setSearchQuery({
                      ...searchQuery,
                      genre: e.target.value,
                    })
                  }
                  defaultValue="Select a genre"
                  className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value="">Select a genre</option>
                  <option value="Classic">Classic</option>
                  <option value="Fantasy">Fantasy</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {data?.data?.map((book: IBook) => {
            return <ProductCard key={book._id} book={book} />;
          })}

          {(data?.data?.length as number) <= 0 && (
            <span className="m-5">No data found</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
