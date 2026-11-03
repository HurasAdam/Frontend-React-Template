import { useQueryClient } from "@tanstack/react-query";
import { useUpdateArticleTagsMutation } from "../mutations/use-articles.mutations";

export const useUpdateArticleTags = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isArticleTagsUpdatePending } =
    useUpdateArticleTagsMutation();

  const updateArticleTags = async (
    articleId: string,
    payload: { title: string },
  ) => {
    await mutateAsync({ articleId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    updateArticleTags,
    isArticleTagsUpdatePending,
  };
};
