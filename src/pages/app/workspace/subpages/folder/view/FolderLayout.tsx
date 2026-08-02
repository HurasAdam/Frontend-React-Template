import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { FolderPage } from "./FolderPage";

export const FolderLayout = () => {
  return (
    <PageContainer variant="default">
      <div className="space-y-8 py-10">
        <FolderPage />
      </div>
    </PageContainer>
  );
};
