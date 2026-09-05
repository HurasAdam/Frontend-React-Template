import { useQueryClient } from "@tanstack/react-query";
import { useTransferOwnership } from "../mutations/use-workspace-members.mutations";

export const useTransferWorkspaceOwnership = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isTransferOwnershipPending } =
    useTransferOwnership();

  const transferWorkspaceOwnership = async (
    workspaceId: string,
    memberId: string,
  ) => {
    await mutateAsync({ workspaceId, memberId });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-members", workspaceId],
    });
  };

  return {
    transferWorkspaceOwnership,
    isTransferOwnershipPending,
  };
};
