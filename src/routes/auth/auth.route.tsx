import { Navigate, Outlet } from "react-router-dom";
import { useAuthQuery } from "../../hooks/auth/use-auth";
import { LoadingPage } from "../../pages/shared/common/loading-page/LoadingPage";

export const AuthRoute = () => {
  const { data: authData, isLoading } = useAuthQuery();

  if (isLoading) return <LoadingPage />;

  if (authData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
