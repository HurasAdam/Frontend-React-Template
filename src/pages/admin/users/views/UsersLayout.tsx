import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { UsersPage } from "./UsersPage";

export const UsersLayout = () => {
  const navigate = useNavigate();

  const openAdd = () => {
    navigate("/admin/users/new");
  };

  return (
    <PageContainer variant="full">
      <UsersPage openAdd={openAdd} />
    </PageContainer>
  );
};
