/* eslint-disable @typescript-eslint/no-floating-promises */
import { useLocation } from "react-router-dom";
import { IBook } from "../../types/globalTypes";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "../../redux/features/books/bookApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ProductCardProps {
  book: IBook;
}

const ProductCard = ({ book }: ProductCardProps) => {
  const {
    _id,
    imgUrl,
    genre,
    title,
    author,
    publicationDate,
    publicationYear,
  } = book;

  const { pathname } = useLocation();

  const [deleteBook, { data, isLoading, isError, isSuccess, error }] =
    useDeleteBookMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook({
          id: id,
        });
      }
    });
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Book deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (isError) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [data, error, isError, isLoading, isSuccess]);

  return (
    <div key={_id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <a className="block relative lg:h-86 xl:h-96 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover w-full h-full block"
          src={imgUrl}
        />
      </a>
      {pathname.includes("/my-books") ? (
        <div className="mt-4 flex justify-between gap-x-2">
          <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg flex-1">
            Edit
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg flex-1"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {genre}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">{author}</p>
          <p className="mt-1 font-semibold">
            {publicationDate} <span>{publicationYear}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
