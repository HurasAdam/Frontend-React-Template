import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { WorkspaceArticlePage } from "./WorkspaceArticlePage";

export default function WorkspaceArticleLayout() {
  return (
    <PageContainer variant="wide">
      <div className="space-y-8 py-10">
        <WorkspaceArticlePage />
      </div>
    </PageContainer>
  );
}
