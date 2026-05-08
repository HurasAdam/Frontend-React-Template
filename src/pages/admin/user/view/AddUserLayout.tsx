import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddUserPage } from "./AddUserPage";

export const AddUserLayout = () => {
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <AddUserPage onCancel={onCancel} />
    </PageContainer>
  );
};
