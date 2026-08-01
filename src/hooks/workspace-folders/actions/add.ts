import { useQueryClient } from "@tanstack/react-query";
import type { IFolderFormData } from "../mutations/types/workspace-folders.mutation.types";
import { useAddWorkspaceFolderMutation } from "../mutations/use-workspace-folders.mutation";

export const useAddWorkspaceFolder = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } =
    useAddWorkspaceFolderMutation();

  const addFolder = async (workspaceId: string, payload: IFolderFormData) => {
    await mutateAsync({ workspaceId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-folders", workspaceId],
    });
  };

  return {
    addFolder,
    isAddPending,
  };
};
