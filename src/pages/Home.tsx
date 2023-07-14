import { useEffect, useState } from "react";

interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imgUrl: string;
}

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data: []) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {books.map((book: IBook) => {
            return (
              <div key={book?.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-96 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover w-full h-full block"
                    src={book?.imgUrl}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {book?.genre}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {book?.title}
                  </h2>
                  <p className="mt-1">{book?.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
