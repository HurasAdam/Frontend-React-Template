import { PageContainer } from "../../../../components/shared/PageContainer";
import { SettingsPage } from "./SettingsPage";

export const SettingsLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="space-y-8 py-10">
        <SettingsPage />
      </div>
    </PageContainer>
  );
};
