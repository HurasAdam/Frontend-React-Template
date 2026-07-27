import { Outlet, useParams } from "react-router-dom";
import { useFindOneWorkspaceQuery } from "../hooks/workspaces/queries/use-workspace.queries";
import { PageLoader } from "../pages/app/workspace/components/PageLoader";
import { WorkspaceSidebar } from "../pages/app/workspace/components/WorkspaceSidebar";
import type { AuthUserData } from "../services/auth/auth.types";

type ProtectedRouteContext = {
  authData: AuthUserData;
};

export const WorkspaceLayout = () => {
  const { id } = useParams();
  const { data: workspace, isLoading: isWorkspaceDataLoading } =
    useFindOneWorkspaceQuery(id);

  if (isWorkspaceDataLoading) {
    return <PageLoader message="Trwa ładowanie kolekcji" />;
  }

  return (
    <div className="flex flex-col  h-screen">
      <div className=" flex w-full h-screen">
        <WorkspaceSidebar workspace={workspace} workspaces={[]} folders={[]} />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto h-full w-full  scrollbar-custom bg-background">
            <div className=" w-full h-full">
              <Outlet context={{ workspace }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
