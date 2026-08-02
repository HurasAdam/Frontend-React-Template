import { useMutation } from "@tanstack/react-query";
import { workspaceArticlesService } from "../../../services/workspace-articles/workspace-articles.service";

export const useAddWorkspaceArticleMutation = () => {
  return useMutation({
    mutationFn: ({ workspaceId, payload }) =>
      workspaceArticlesService.add({ ...payload, workspaceId }),
  });
};
