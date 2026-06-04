import { PageContainer } from "../../../../components/shared/PageContainer";
import { ResetPasswordModal } from "../../../../features/users/components/ResetPasswordModal";

import { useUserModal } from "../../../../features/users/hooks/useUserModal";
import { UserDetailsPage } from "./UserDetailsPage";

export const UserDetailsLayout = () => {
  const { isOpen, openPasswordReset, close, user } = useUserModal();
  return (
    <PageContainer variant="default">
      <UserDetailsPage openPasswordReset={openPasswordReset} />

      <ResetPasswordModal isOpen={isOpen} onClose={close} user={user} />
    </PageContainer>
  );
};
