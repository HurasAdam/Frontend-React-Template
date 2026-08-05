import { useQueryClient } from "@tanstack/react-query";
import type { AddWorkspaceArticleFormData } from "../../../validation/workspace-article/add";
import { useAddWorkspaceArticleMutation } from "../mutations/use-workspace-articles.mutations";

export const useAddWorkspaceArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } =
    useAddWorkspaceArticleMutation();

  const addWorkspaceArticle = async ({
    workspaceId,
    payload,
  }: {
    payload: AddWorkspaceArticleFormData;
    workspaceId: string;
  }) => {
    await mutateAsync({ workspaceId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-folders", workspaceId],
    });
  };

  return {
    addWorkspaceArticle,
    isAddPending,
  };
};
