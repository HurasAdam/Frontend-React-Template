import { PageContainer } from "../../../../components/shared/PageContainer";
import { ArticlePage } from "./ArticlePage";

export const ArticleLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <ArticlePage />
      </div>
    </PageContainer>
  );
};
