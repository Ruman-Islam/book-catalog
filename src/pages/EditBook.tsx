import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import Spinner from "../components/common/Spinner";
import { toast } from "react-toastify";

interface IBookForm {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  imgUrl: File | string;
}

interface ImageData {
  delete_url: string;
  display_url: string;
  expiration: number;
  height: number;
  id: string;
  image: ImageInfo;
  medium: ImageInfo;
  size: number;
  thumb: ImageInfo;
  time: number;
  title: string;
  url: string;
  url_viewer: string;
  width: number;
}

interface ImageInfo {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

interface IImageBB {
  data: ImageData;
  status: 200;
  success: boolean;
}

const convertDate = (date: string): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const EditBook = () => {
  const { id } = useParams();
  const [form, setForm] = useState<IBookForm>({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    publicationYear: "",
    imgUrl: "",
  });

  const [errorMessage, setError] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    publicationYear: "",
    imgUrl: "",
  });

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setForm({
      ...form,
      imgUrl: e.target.files[0],
    });
  };

  const { data, isLoading } = useGetSingleBookQuery(id as string, {
    refetchOnMountOrArgChange: true,
  });
  const [
    updateBook,
    { isLoading: updatingLoading, isError, isSuccess, error },
  ] = useUpdateBookMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError({
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
      publicationYear: "",
      imgUrl: "",
    });

    let hasError = false;

    if (form.title.trim() === "") {
      setError((prevErrors) => ({ ...prevErrors, title: "Title is required" }));
      hasError = true;
    }

    if (form.author.trim() === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        author: "Author is required",
      }));
      hasError = true;
    }

    if (form.genre.trim() === "") {
      setError((prevErrors) => ({ ...prevErrors, genre: "Genre is required" }));
      hasError = true;
    }

    if (form.publicationDate.trim() === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        publicationDate: "Publication date is required",
      }));
      hasError = true;
    }

    if (form.imgUrl === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        imgUrl: "Image is required",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    hasError = false;

    const formData = new FormData();
    formData.append("image", form?.imgUrl);
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=8e668862332369974c159a0989511b90",
      {
        method: "POST",
        body: formData,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imageData: IImageBB = await response.json();

    const date = new Date(form.publicationDate).toDateString().split(" ");

    const uploadForm = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      publicationDate: `${date[0]} ${date[1]} ${date[2]}`,
      publicationYear: date[3],
      imgUrl: imageData.data.url,
    };

    void updateBook({
      id: id as string,
      data: uploadForm,
    });
  };

  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        title: data?.data?.title,
        author: data?.data?.author,
        genre: data?.data?.genre,
        publicationDate: convertDate(
          data?.data?.publicationDate + " " + data?.data?.publicationYear
        ),
        imgUrl: data?.data?.imgUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isSuccess && !updatingLoading) {
      toast.success("Book updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/my-books");
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
  }, [data, error, isError, isSuccess, navigate, updatingLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          className="max-w-[600px] mx-auto w-full bg-gray-100 rounded-lg p-8 flex flex-col mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Edit Your Book
          </h2>
          <div className="relative mb-4">
            <label htmlFor="title" className="leading-7 text-sm text-gray-600">
              Book Title
            </label>
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              type="text"
              id="title"
              name="title"
              defaultValue={form.title}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.title}</p>
          </div>
          <div className="relative mb-4">
            <label htmlFor="author" className="leading-7 text-sm text-gray-600">
              Author
            </label>
            <input
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              type="text"
              id="author"
              name="author"
              defaultValue={form.author}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.author}</p>
          </div>
          <div className="relative mb-4">
            <label htmlFor="genre" className="leading-7 text-sm text-gray-600">
              Genre
            </label>
            <input
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              type="text"
              id="genre"
              name="genre"
              defaultValue={form.genre}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.genre}</p>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="publication-date"
              className="leading-7 text-sm text-gray-600"
            >
              Publication Date
            </label>
            <input
              onChange={(e) =>
                setForm({ ...form, publicationDate: e.target.value })
              }
              type="date"
              id="publication-date"
              name="publication-date"
              defaultValue={form.publicationDate}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.publicationDate}</p>
          </div>
          <div className="relative mb-4">
            <input
              onChange={handleFileChange}
              type="file"
              id="img"
              name="img"
              className="rounded text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out cursor-pointer"
            />
            <p className="text-red-600">{errorMessage.imgUrl}</p>
          </div>

          {updatingLoading ? (
            <div
              className="inline-block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          ) : (
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default EditBook;
