import { useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useGetSingleBookQuery,
} from "../redux/features/books/bookApi";
import Spinner from "../components/common/Spinner";
import { useState } from "react";
import { useAppSelector } from "../redux/hook";
import Swal from "sweetalert2";

const BookDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState("");
  const { email } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleBookQuery(id as string, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 500,
  });
  const [addReview] = useAddReviewMutation();

  const handlePost = () => {
    if (!email) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      return Swal.fire("Unauthorized", "You have to login first", "error");
    }

    const options = {
      id: id as string,
      data: { review: review },
    };
    setReview("");
    void addReview(options);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={data?.data.imgUrl}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 absolute right-0">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {data?.data?.genre}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data?.data?.title}
            </h1>
            <h1 className="text-gray-500 text-xl title-font font-medium mb-1">
              {data?.data?.author}
            </h1>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>

            <div className="flex border-t-2 border-gray-100 mt-5">
              <div className="flex w-full md:justify-start justify-center items-end">
                <div className="relative mr-4  w-full">
                  <input
                    onChange={(e) => setReview(e.target.value)}
                    type="text"
                    id="hero-field"
                    name="hero-field"
                    placeholder="Give Review"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={handlePost}
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Post
                </button>
              </div>
            </div>

            <section className="text-gray-600 body-font mt-5">
              <h1 className="text-3xl">Reviews</h1>
              <div className="py-8 mx-auto flex flex-wrap">
                {data?.data.reviews.map(
                  (review: { name: string; text: string }, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex relative py-2 sm:items-center w-full mx-auto"
                      >
                        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-grow flex sm:items-center items-start flex-col sm:flex-row">
                          <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                            <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                              {review.name}
                            </h2>
                            <p className="leading-relaxed">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
