import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { NewWorkspacePage } from "./NewWorkspacePage";

export const NewWorkspaceLayout = () => {
  const navigate = useNavigate();

  const onBack = (): void => {
    navigate(-1);
  };

  return (
    <PageContainer variant="default">
      <NewWorkspacePage onClose={onBack} />
    </PageContainer>
  );
};
