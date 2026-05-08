import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { RolesPage } from "./RolesPage";

export const RolesLayout = () => {
  const navigate = useNavigate();

  const openAdd = () => {
    navigate("/admin/roles/new");
  };
  return (
    <PageContainer variant="full">
      <RolesPage openAdd={openAdd} />
    </PageContainer>
  );
};
