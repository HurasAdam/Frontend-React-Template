import { LuLoader } from "react-icons/lu";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
  const isLoading = true;

  const authData = false;
  if (isLoading)
    return (
      <div className="flex flex-col gap-4 justify-center items-center w-full h-screen bg-slate-200">
        <LuLoader className=" w-7 h-7 animate-spin text-slate-700" />

        <p className="text-sm text-slate-500 tracking-wide">
          Ładowanie danych...
        </p>
      </div>
    );

  if (authData) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
