import { PageContainer } from "../../../../components/shared/PageContainer";
import { EditRoleModal } from "../../../../features/users/components/EditRoleModal";
import { ResetPasswordModal } from "../../../../features/users/components/ResetPasswordModal";

import { useUserModal } from "../../../../features/users/hooks/useUserModal";
import { UserDetailsPage } from "./UserDetailsPage";

export const UserDetailsLayout = () => {
  const {
    isPasswordResetOpen,
    isRoleEditOpen,
    openPasswordReset,
    openEditRole,
    close,
    user,
  } = useUserModal();
  return (
    <PageContainer variant="default">
      <UserDetailsPage
        openPasswordReset={openPasswordReset}
        openEditRole={openEditRole}
      />
      <ResetPasswordModal
        isOpen={isPasswordResetOpen}
        onClose={close}
        user={user}
      />
      <EditRoleModal isOpen={isRoleEditOpen} onClose={close} user={user} />
    </PageContainer>
  );
};
