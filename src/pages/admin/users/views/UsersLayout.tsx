import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { AddUserModal } from "../../../../features/users/components/AddUserModal";
import { useUserModal } from "../../../../features/users/hooks/useUserModal";
import { UsersPage } from "./UsersPage";

export const UsersLayout = () => {
  const modal = useUserModal();

  const navigate = useNavigate();

  const openAdd = () => {
    navigate("/admin/users/new");
  };

  return (
    <PageContainer variant="full">
      <UsersPage openAdd={openAdd} />
      <AddUserModal isOpen={modal.isOpen} onClose={modal.close} roles={[]} />
    </PageContainer>
  );
};
