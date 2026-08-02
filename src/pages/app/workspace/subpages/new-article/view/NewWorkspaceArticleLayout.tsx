import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { NewWorkspaceArticlePage } from "./NewWorkspaceArticlePage";

export const NewWorkspaceArticleLayout = () => {
  return (
    <PageContainer variant="default">
      <div className="space-y-8 py-10">
        <NewWorkspaceArticlePage />
      </div>
    </PageContainer>
  );
};
