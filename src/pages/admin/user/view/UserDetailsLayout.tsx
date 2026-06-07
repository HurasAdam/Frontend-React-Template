import { PageContainer } from "../../../../components/shared/PageContainer";

import { useUserModal } from "../../../../features/users/hooks/useUserModal";
import { EditRoleModal } from "../components/EditRoleModal";
import { EditUserModal } from "../components/EditUserModal";
import { ResetPasswordModal } from "../components/ResetPasswordModal";
import { UserDetailsPage } from "./UserDetailsPage";

export const UserDetailsLayout = () => {
  const {
    isPasswordResetOpen,
    isRoleEditOpen,
    isUserEditOpen,
    openPasswordReset,
    openEditRole,
    openEditUser,
    close,
    user,
  } = useUserModal();
  return (
    <PageContainer variant="default">
      <UserDetailsPage
        openPasswordReset={openPasswordReset}
        openEditRole={openEditRole}
        openEditUser={openEditUser}
      />
      <ResetPasswordModal
        isOpen={isPasswordResetOpen}
        onClose={close}
        user={user}
      />
      <EditRoleModal isOpen={isRoleEditOpen} onClose={close} user={user} />

      <EditUserModal isOpen={isUserEditOpen} user={user} onClose={close} />
    </PageContainer>
  );
};
