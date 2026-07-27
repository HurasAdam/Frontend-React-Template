import { PageContainer } from "../../../../../../components/shared/PageContainer";
import { Settings } from "./Settings";

export const SettingsLayout = () => {
  return (
    <PageContainer variant="default">
      <div className="space-y-8 py-10">
        <Settings />
      </div>
    </PageContainer>
  );
};
