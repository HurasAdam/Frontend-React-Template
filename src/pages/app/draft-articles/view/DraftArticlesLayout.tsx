import { PageContainer } from "../../../../components/shared/PageContainer";
import { DraftArticlesPage } from "./DraftArticlesPage";

export const DraftArticlesLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <DraftArticlesPage />
      </div>
    </PageContainer>
  );
};
