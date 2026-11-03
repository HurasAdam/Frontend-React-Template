import { useQueryClient } from "@tanstack/react-query";
import { useUpdateArticleTitleMutation } from "../mutations/use-articles.mutations";

export const useUpdateArticleTitle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isArticleTitlteUpdatePending } =
    useUpdateArticleTitleMutation();

  const updateArticleTitle = async (
    articleId: string,
    payload: { title: string },
  ) => {
    await mutateAsync({ articleId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    updateArticleTitle,
    isArticleTitlteUpdatePending,
  };
};
