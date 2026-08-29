import { useQueryClient } from "@tanstack/react-query";
import type { UpdateWorkspaceArticleFormData } from "../../../validation/workspace-article/update";
import { useUpdateWorkspaceArticleMutation } from "../mutations/use-workspace-articles.mutations";

export const useUpdateWorkspaceArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateWorkspaceArticleMutation();

  const updateWorkspaceArticle = async ({
    workspaceId,
    articleId,
    payload,
  }: {
    workspaceId: string;
    articleId: string;
    payload: UpdateWorkspaceArticleFormData;
  }) => {
    await mutateAsync({ workspaceId, articleId, payload });

    queryClient.invalidateQueries({
      queryKey: ["workspace-article", articleId],
    });

    queryClient.invalidateQueries({
      queryKey: ["workspace-folders", workspaceId],
    });
  };

  return {
    updateWorkspaceArticle,
    isUpdatePending,
  };
};
