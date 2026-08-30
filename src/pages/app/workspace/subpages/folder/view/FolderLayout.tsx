import { FolderOpen, LayoutDashboard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import { useFindWorkspaceArticlesByFolderQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";
import { FolderPage } from "./FolderPage";

export const FolderLayout = () => {
  const navigate = useNavigate();
  const { id: workspaceId, folderId } = useParams();

  const { data, isLoading } = useFindWorkspaceArticlesByFolderQuery(
    workspaceId,
    folderId,
  );

  const folder = data?.folder;

  return (
    <>
      <TopBar
        rootBreadcrumb={{
          label: "Tablica",
          href: `/workspace/${workspaceId}`,
          icon: LayoutDashboard,
          iconClassName: "text-muted-foreground",
        }}
        breadcrumbs={[
          {
            label: folder?.name ?? "Folder",
            icon: FolderOpen,
            iconClassName: "text-amber-500",
          },
        ]}
        containerVariant="extraWide"
        onBack={() => navigate(-1)}
        workspaceId={workspaceId}
      />

      <PageContainer variant="extraWide">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <FolderPage
            workspaceId={workspaceId ?? ""}
            folder={folder}
            articles={data?.articles ?? []}
            isLoading={isLoading}
          />
        </div>
      </PageContainer>
    </>
  );
};
