import queryClient from "../../../config/query.config";
import { useChangeUserRoleMutation } from "../mutations/use-admin.mutations";

export const useChangeUserRoleAction = () => {
  const { mutate, isPending } = useChangeUserRoleMutation();

  const changeRole = ({
    userId,
    roleId,
    onSuccess,
  }: {
    userId: string;
    roleId: string;
    onSuccess?: () => void;
  }) => {
    mutate(
      { id: userId, roleId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["user-with-details", userId],
          });

          onSuccess?.();
        },
      },
    );
  };

  return { changeRole, isPending };
};
