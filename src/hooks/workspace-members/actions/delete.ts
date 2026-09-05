import { useQueryClient } from "@tanstack/react-query";
import { useDeleteWorkspaceMemberMutation } from "../mutations/use-workspace-members.mutations";

export const useDeleteWorkspaceMember = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isDeletePending } =
    useDeleteWorkspaceMemberMutation();

  const deleteWorkspaceMember = async (
    workspaceId: string,
    memberId: string,
  ) => {
    await mutateAsync({ workspaceId, memberId });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-members", workspaceId],
    });
  };

  return {
    deleteWorkspaceMember,
    isDeletePending,
  };
};
