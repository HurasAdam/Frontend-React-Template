import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { Members } from "./Members";

export const MembersLayout = () => {
  return (
    <PageContainer variant="default">
      <div className="space-y-8 py-10">
        <Members />
      </div>
    </PageContainer>
  );
};
