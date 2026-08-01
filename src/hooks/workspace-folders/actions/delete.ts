import { useQueryClient } from "@tanstack/react-query";
import { useDeleteWorkspaceFolderMutation } from "../mutations/use-workspace-folders.mutation";

export const useDeleteWorkspaceFolder = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useDeleteWorkspaceFolderMutation();

  const deleteFolder = async (folderId: string, workspaceId: string) => {
    await mutateAsync(folderId);

    await queryClient.invalidateQueries({
      queryKey: ["workspace-folders", workspaceId],
    });
  };

  return {
    deleteFolder,
    isPending: isPending,
  };
};
