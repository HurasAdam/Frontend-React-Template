import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePermissionsMutation } from "../mutations/use-workspace-members.mutations";

export const useUpdateWorkspaceMemberPermissions = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdatePermissionsPending } =
    useUpdatePermissionsMutation();

  const updatePermissions = async (
    workspaceId: string,
    memberId: string,
    permissions: unknown,
  ) => {
    await mutateAsync({ workspaceId, memberId, permissions });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-members", workspaceId],
    });
  };

  return {
    updatePermissions,
    isUpdatePermissionsPending,
  };
};
