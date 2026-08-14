import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { Folders } from "./Folders";

export const FoldersLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="space-y-8 px-4 lg:px-8 lg:py-8">
        <Folders />
      </div>
    </PageContainer>
  );
};
