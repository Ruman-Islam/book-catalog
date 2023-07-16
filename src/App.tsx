/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";
import Layout from "./layout/Layout";
import { useGetLoggedInUserQuery } from "./redux/features/user/userApi";
import Spinner from "./components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hook";
import { setUser } from "./redux/features/user/userSlice";

interface IResponse {
  data: {
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    id: string;
    _id: string;
    __v: number;
  };
  message: string;
  meta: null;
  statusCode: number;
  success: boolean;
}

function App() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetLoggedInUserQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const { data: userData } = data as IResponse;
      dispatch(
        setUser({
          name: userData?.name,
          email: userData?.email,
          id: userData?.id,
        })
      );
    }
    if (isError) {
      navigate("/");
    }
  }, [data, dispatch, isError, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
