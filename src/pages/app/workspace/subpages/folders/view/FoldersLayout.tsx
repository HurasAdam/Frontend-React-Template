import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { Folders } from "./Folders";

export const FoldersLayout = () => {
  return (
    <PageContainer variant="default">
      <div className="space-y-8 py-10">
        <Folders />
      </div>
    </PageContainer>
  );
};
