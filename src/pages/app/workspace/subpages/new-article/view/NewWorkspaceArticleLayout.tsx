import { FilePlus, LayoutDashboard } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import type { WorkspaceContext } from "../../settings/view/Settings";
import { NewWorkspaceArticlePage } from "./NewWorkspaceArticlePage";

export const NewWorkspaceArticleLayout = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();
  const navigate = useNavigate();
  return (
    <>
      <TopBar
        rootBreadcrumb={{
          label: "Tablica",
          href: `/workspace/${workspace.id}`,
          icon: LayoutDashboard,
          iconClassName: "text-muted-foreground",
        }}
        breadcrumbs={[
          {
            label: "Nowy artykuł",
            icon: FilePlus,
            iconClassName: "text-emerald-500",
          },
        ]}
        containerVariant="wide"
        onBack={() => navigate(-1)}
        workspaceId={workspace.id}
      />

      <PageContainer variant="wide">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <NewWorkspaceArticlePage />
        </div>
      </PageContainer>
    </>
  );
};
