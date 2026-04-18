import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-700">
      <Outlet />
    </div>
  );
};
