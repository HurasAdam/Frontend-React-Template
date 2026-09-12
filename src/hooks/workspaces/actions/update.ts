import { useQueryClient } from "@tanstack/react-query";

import type { UpdateWorkspaceData } from "../../../pages/app/workspace/subpages/settings/modals/WorkspaceEditModalSection";
import { useUpdateWorkspaceMutation } from "../mutations/use-workspace.mutations";

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateWorkspaceMutation();

  const updateWorkspace = async (
    workspaceId: string,
    payload: UpdateWorkspaceData,
  ) => {
    await mutateAsync({ workspaceId, payload });
    await queryClient.invalidateQueries({
      queryKey: ["workspace", workspaceId],
    });
  };

  return {
    updateWorkspace,
    isUpdatePending,
  };
};
