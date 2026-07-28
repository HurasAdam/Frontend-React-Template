import { Outlet, useParams } from "react-router-dom";
import {
  useFindOneWorkspaceQuery,
  useFindUserWorkspaceMembershipQuery,
} from "../hooks/workspaces/queries/use-workspace.queries";
import { WorkspaceAccessDenied } from "../pages/app/workspace/components/AccessDenied";
import { PageLoader } from "../pages/app/workspace/components/PageLoader";
import { WorkspaceSidebar } from "../pages/app/workspace/components/WorkspaceSidebar";
import type { AuthUserData } from "../services/auth/auth.types";

type ProtectedRouteContext = {
  authData: AuthUserData;
};

export const WorkspaceLayout = () => {
  const { id } = useParams();

  const {
    data: membership,
    isLoading: isMembershipLoading,
    error,
  } = useFindUserWorkspaceMembershipQuery(id);

  console.log("BREED:", membership);
  const { data: workspace, isLoading: isWorkspaceDataLoading } =
    useFindOneWorkspaceQuery(id);

  if (isWorkspaceDataLoading || isMembershipLoading) {
    return <PageLoader message="Trwa ładowanie kolekcji" />;
  }

  if (error) {
    return <WorkspaceAccessDenied message="Nie masz dostępu do tej kolekcji" />;
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
