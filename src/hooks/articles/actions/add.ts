import { useQueryClient } from "@tanstack/react-query";
import type { CreateArticlePayload } from "../../../validation/articles/create-article.schema";
import { useCreateArticleMutation } from "../mutations/use-articles.mutations";

export const useAddArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } = useCreateArticleMutation();

  const addArticle = async (payload: CreateArticlePayload) => {
    await mutateAsync(payload);

    await queryClient.invalidateQueries({
      queryKey: ["workspace-members"],
    });
  };

  return {
    addArticle,
    isAddPending,
  };
};
