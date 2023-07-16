/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";
import Layout from "./layout/Layout";
import { useGetLoggedInUserQuery } from "./redux/features/user/userApi";
import Spinner from "./components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hook";
import { setUser } from "./redux/features/user/userSlice";

interface UserData {
  name: string;
  email: string;
  id: string;
}

function App() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetLoggedInUserQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      const userData = data?.data as UserData;
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
