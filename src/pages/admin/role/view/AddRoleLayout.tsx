import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../../../components/shared/PageContainer";
import { useGetPermissionsQuery } from "../../../../hooks/roles/use-roles";
import { AddRolePage } from "./AddRolePage";

export const AddRoleLayout = () => {
  const navigate = useNavigate();
  const { data: permissionsList } = useGetPermissionsQuery();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <PageContainer variant="default">
      <AddRolePage onClose={onClose} permissionsList={permissionsList} />
    </PageContainer>
  );
};
