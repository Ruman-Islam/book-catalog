import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";

const saveLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setError] = useState({
    email: "",
    password: "",
  });

  const [login, { data, isLoading, isError, isSuccess, error }] =
    useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.email === "") {
      setError({ ...errorMessage, email: "Email is required" });
      return;
    }
    if (user.email !== "" && errorMessage.email !== "") {
      setError({ ...errorMessage, email: "" });
    }
    if (user.password === "") {
      setError({ ...errorMessage, password: "Password is required" });
      return;
    }
    if (user.password !== "" && errorMessage.password !== "") {
      setError({ ...errorMessage, password: "" });
    }

    setError({ email: "", password: "" });
    void login(user);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      navigate("/");
      toast.success("You have signed in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // save token to local storage
      saveLocalStorage("x-auth-token", data?.data?.accessToken as string);
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
  }, [data, error, isError, isLoading, isSuccess, navigate]);

  return (
    <section className="text-gray-600 body-font relative">
      <div className="max-w-[500px] w-full px-5 py-24 mx-auto flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full md:py-8 border mt-8 md:mt-0 p-10 flex-1"
        >
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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.email}</p>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-600">{errorMessage.password}</p>
          </div>
          {isLoading ? (
            <div
              className="inline-block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          ) : (
            <>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Submit
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Don't have account?{" "}
                <Link to="/sign-up">
                  <span className="text-indigo-500">Sign Up</span>
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default SignIn;
