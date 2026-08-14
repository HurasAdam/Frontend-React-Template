import { Outlet, useOutletContext } from "react-router-dom";
import { AppSidebar } from "../components/sidebar/base-sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import type { AuthUserData } from "../services/auth/auth.types";

type ProtectedRouteContext = {
  authData: AuthUserData;
};

export const BaseLayout = () => {
  const { authData } = useOutletContext<ProtectedRouteContext>();
  return (
    <div className="w-full h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "290px",
          } as React.CSSProperties
        }
      >
        <AppSidebar user={authData} />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 mt-2.5 data-[orientation=vertical]:h-8 opacity-55"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-6 px-10 ">
            <Outlet context={{ authData }} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
