import { PageContainer } from "../../../../components/shared/PageContainer";
import ArticleHistoryPage from "./ArticleHistoryPage";

export const ArticleHistoryLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <ArticleHistoryPage />
      </div>
    </PageContainer>
  );
};
