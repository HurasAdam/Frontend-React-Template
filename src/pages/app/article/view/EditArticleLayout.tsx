import { PageContainer } from "../../../../components/shared/PageContainer";
import { EditArticlePage } from "./EditArticlePage";

export const EditArticleLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <EditArticlePage />
      </div>
    </PageContainer>
  );
};
