import { useQuery } from "@tanstack/react-query";
import { workspaceFoldersService } from "../../../services/workspace-folders/workspace-folders.service";

export const useFindAllFoldersByWorkspaceQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["workspace-folders", workspaceId],
    queryFn: () =>
      workspaceFoldersService.findAllByWorkspace(workspaceId as string),
    enabled: !!workspaceId,
  });
};
