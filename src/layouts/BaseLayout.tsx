/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Outlet, useOutletContext } from "react-router-dom";
import { AppHeader } from "../components/header/AppHeader";
import { AppSidebar } from "../components/sidebar/base-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";

import type { AuthUserData } from "../services/auth/auth.types";

export type ProtectedRouteContext = {
  authData: AuthUserData;
};

export const BaseLayout = () => {
  const { authData } = useOutletContext<ProtectedRouteContext>();

  return (
    <div className="h-screen w-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "290px",
          } as React.CSSProperties
        }
      >
        <AppSidebar user={authData} />

        <SidebarInset>
          <AppHeader />

          <main className="flex flex-1 flex-col gap-6 px-10">
            <Outlet context={{ authData }} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
