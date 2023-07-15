import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="max-w-[500px] w-full px-5 py-24 mx-auto flex justify-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full md:py-8 border mt-8 md:mt-0 p-10 flex-1">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Sign In
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600 italic">
            Input your valuable credentials. Don't miss anything, otherwise you
            cannot login!
          </p>
          <div className="h-96">
            <img
              className="h-full w-full object-cover"
              src="https://lowres.cartooncollections.com/mugs-muggings-threatens-password-username-technology-CX907109_low.jpg"
              alt=""
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Don't have account?{" "}
            <Link to="/sign-up">
              <span className="text-indigo-500">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
