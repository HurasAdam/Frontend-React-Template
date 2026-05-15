import { Navigate, Outlet } from "react-router-dom";
import { useAuthQuery } from "../../hooks/auth/use-auth";

export const AdminRoute = () => {
  const { data: user, isLoading } = useAuthQuery();

  const permissions = user.role.permissions;
  const canAccessAdmin = permissions.includes("ACCESS_ADMIN_PANEL");

  if (isLoading) return null;

  if (!user || !canAccessAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
