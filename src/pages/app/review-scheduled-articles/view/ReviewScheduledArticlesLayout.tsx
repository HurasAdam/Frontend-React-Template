import { PageContainer } from "../../../../components/shared/PageContainer";
import { ReviewScheduledArticlesPage } from "./ReviewScheduledArticlesPage";

export const ReviewScheduledArticlesLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <ReviewScheduledArticlesPage />
      </div>
    </PageContainer>
  );
};
