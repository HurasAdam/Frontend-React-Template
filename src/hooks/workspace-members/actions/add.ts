import { useQueryClient } from "@tanstack/react-query";
import { useAddWorkspaceMembersMutation } from "../mutations/use-workspace-members.mutations";

export const useAddWorkspaceMembers = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } =
    useAddWorkspaceMembersMutation();

  const addWorkspaceMembers = async (
    workspaceId: string,
    userIds: string[],
  ) => {
    await mutateAsync({ workspaceId, userIds });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-members", workspaceId],
    });
  };

  return {
    addWorkspaceMembers,
    isAddPending,
  };
};
