import { useQuery } from "@tanstack/react-query";
import { workspaceArticlesService } from "../../../services/workspace-articles/workspace-articles.service";

export const useFindWorkspaceArticlesByFolderQuery = (
  workspaceId?: string,
  folderId?: string,
) => {
  return useQuery({
    queryKey: ["workspace-articles", workspaceId, folderId],
    queryFn: () =>
      workspaceArticlesService.findByFolder(workspaceId!, folderId!),
    enabled: !!workspaceId && !!folderId,
  });
};

export const useFindOneWorkspaceArticleQuery = (
  workspaceId?: string,
  articleId?: string,
) => {
  return useQuery({
    queryKey: ["workspace-article", articleId],
    queryFn: () => workspaceArticlesService.findOne(workspaceId!, articleId!),
    enabled: !!workspaceId && !!articleId,
  });
};
