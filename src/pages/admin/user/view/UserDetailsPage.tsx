import { useNavigate, useParams } from "react-router-dom";

import { useFindUserWithDetailsQuery } from "../../../../hooks/admin/queries/use-admin.queries";
import type { IUserWithDetails } from "../../../../services/admin/users/users.types";
import { UserDetailsHeader } from "../components/UserDetailsHeader";
import { UserDetailsSection } from "../components/UserDetailsSection";

interface Props {
  openPasswordReset: (user: IUserWithDetails) => void;
  openEditRole: (user: IUserWithDetails) => void;
  openEditUser: (user: IUserWithDetails) => void;
}

export const UserDetailsPage = ({
  openPasswordReset,
  openEditRole,
  openEditUser,
}: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: user } = useFindUserWithDetailsQuery(id!);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <UserDetailsHeader
        user={user}
        onBack={() => navigate(-1)}
        onEditUser={() => openEditUser(user)}
        onResetPassword={() => openPasswordReset(user)}
        onEditRole={() => openEditRole(user)}
      />

      <UserDetailsSection user={user} />
    </div>
  );
};
