import { PageContainer } from "../../../../components/shared/PageContainer";
import { RegisterActivityPage } from "./RegisterActivityPage";

export const RegisterActivityLayout = () => {
  return (
    <PageContainer variant="wide">
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <RegisterActivityPage />
      </div>
    </PageContainer>
  );
};
