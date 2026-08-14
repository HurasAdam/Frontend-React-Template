import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { FolderPage } from "./FolderPage";

export const FolderLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <FolderPage />
      </div>
    </PageContainer>
  );
};
