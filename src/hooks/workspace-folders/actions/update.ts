import { useQueryClient } from "@tanstack/react-query";
import type { IFolderFormData } from "../mutations/types/workspace-folders.mutation.types";
import { useUpdateWorkspaceFolderMutation } from "../mutations/use-workspace-folders.mutation";

export const useUpdateWorkspaceFolder = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateWorkspaceFolderMutation();

  const updateFolder = async (
    folderId: string,
    workspaceId: string,
    payload: IFolderFormData,
  ) => {
    await mutateAsync({ folderId, payload });
    await queryClient.invalidateQueries({
      queryKey: ["workspace-folders", workspaceId],
    });
  };

  return {
    updateFolder,
    isUpdatePending,
  };
};
