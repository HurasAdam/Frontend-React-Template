import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";

export const BaseLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
