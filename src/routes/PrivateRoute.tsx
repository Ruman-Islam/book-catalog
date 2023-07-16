import { useAppSelector } from "../redux/hook";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/common/Spinner";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.email) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user?.email && !user?.name && !user?.id) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }

  return children;
}
