import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useFindAllFoldersByWorkspaceQuery } from "../hooks/workspace-folders/queries/use-workspace-folders.queries";
import {
  useFindOneWorkspaceQuery,
  useFindUserWorkspaceMembershipQuery,
} from "../hooks/workspaces/queries/use-workspace.queries";
import { WorkspaceAccessDenied } from "../pages/app/workspace/components/AccessDenied";
import { PageLoader } from "../pages/app/workspace/components/PageLoader";
import type { AuthUserData } from "../services/auth/auth.types";

import {
  BarChart3,
  BookOpen,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  Link as LinkIcon,
  MessagesSquare,
  Star,
  Wrench,
} from "lucide-react";
import { WorkspaceCommandMenu } from "../components/sidebar/workspace-command-menu/workspace-command-menu";
import { Sidebar } from "../components/sidebar/workspace-sidebar";

type ProtectedRouteContext = {
  authData: AuthUserData;
};

export const WorkspaceLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: membership,
    isLoading: isMembershipLoading,
    error,
  } = useFindUserWorkspaceMembershipQuery(id);

  const { data: workspace = {}, isLoading: isWorkspaceDataLoading } =
    useFindOneWorkspaceQuery(id);

  const { data: folders = [] } = useFindAllFoldersByWorkspaceQuery(id);

  console.log("FOLDERS", folders);

  const handleNewArticle = () => {
    navigate(`/workspace/${id}/new-article`);
  };

  if (isWorkspaceDataLoading || isMembershipLoading) {
    return <PageLoader message="Trwa ładowanie kolekcji" />;
  }

  if (error) {
    return <WorkspaceAccessDenied message="Nie masz dostępu do tej kolekcji" />;
  }

  console.log("DUPA");
  return (
    <div className="min-h-screen bg-background">
      <Sidebar workspace={workspace} folders={folders} />

      {/* <TopBar
        workspace={workspace}
        view={{ kind: "members" }}
        onNewArticle={() => {}}
        onOpenSettings={() => {}}
        onOpenMembers={() => {}}
        onOpenFolders={() => {}}
        onBackToBase={() => {}}
        onToggleMobileSidebar={() => {}}
      /> */}

      {/* Main content */}
      <main className="lg:pl-[280px]">
        <div className="mx-auto">
          <Outlet context={{ workspace, folders }} />
        </div>

        <WorkspaceCommandMenu
          onOpenArticle={(articleId) => {
            navigate(`/workspace/${workspace?.id}/articles/${articleId}`);
          }}
          onOpenFolder={(folderId) => {
            navigate(`/workspace/${workspace?.id}/folders/${folderId}`);
          }}
        />
      </main>
    </div>
  );
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  MessagesSquare,
  BarChart3,
  Star,
  Link: LinkIcon,
  Wrench,
  FolderOpen,
};

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};
