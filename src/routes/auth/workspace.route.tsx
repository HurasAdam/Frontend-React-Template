import { Navigate, Outlet } from "react-router-dom";

export const WorkspaceRoute = () => {
  //   const { data: user, isLoading } = useAuthQuery();

  const canAccessWorkspace = true;

  //   if (isLoading) return null;

  if (!canAccessWorkspace) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
