import { PageContainer } from "../../../../components/shared/PageContainer";
import { ArticlesPage } from "./ArticlesPage";

export const ArticlesLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <ArticlesPage />
      </div>
    </PageContainer>
  );
};
