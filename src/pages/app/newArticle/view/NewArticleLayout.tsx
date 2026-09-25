import { PageContainer } from "../../../../components/shared/PageContainer";
import { NewArticlePage } from "./NewArticlePage";

export const NewArticleLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        {" "}
        <NewArticlePage />
      </div>
    </PageContainer>
  );
};
