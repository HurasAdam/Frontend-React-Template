import { useNavigate, useParams } from "react-router-dom";

import { FileText, FolderOpen, LayoutDashboard } from "lucide-react";
import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { TopBar } from "../../../../../../components/topbar/workspace-topbar";
import { useFindOneWorkspaceArticleQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";
import { WorkspaceArticlePage } from "./WorkspaceArticlePage";

export default function WorkspaceArticleLayout() {
  const { id: workspaceId, articleId } = useParams();
  const navigate = useNavigate();
  const query = useFindOneWorkspaceArticleQuery(workspaceId!, articleId!);

  return (
    <>
      <TopBar
        rootBreadcrumb={{
          label: "Pulpit",
          href: `/workspace/${workspaceId}`,
          icon: LayoutDashboard,
          iconClassName: "text-muted-foreground",
        }}
        breadcrumbs={[
          {
            label: query.data?.folder?.name ?? "Folder",
            href: `/workspace/${workspaceId}/folders/${query.data?.folder?.id}`,
            icon: FolderOpen,
            iconClassName: "text-amber-500",
          },
          {
            label: query.data?.title ?? "Artykuł",
            icon: FileText,
            iconClassName: "text-muted-foreground",
          },
        ]}
        containerVariant="extraWide"
        onBack={() => navigate(-1)}
      />
      <PageContainer variant="extraWide">
        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <WorkspaceArticlePage
            article={query.data}
            isLoading={query.isLoading}
            isError={query.isError}
            refetch={query.refetch}
          />
        </div>
      </PageContainer>
    </>
  );
}
