import { Navigate, Outlet } from "react-router-dom";
import { useAuthQuery } from "../../hooks/auth/use-auth";

export const AdminRoute = () => {
  const { data: user, isLoading } = useAuthQuery();

  if (isLoading) return null;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
