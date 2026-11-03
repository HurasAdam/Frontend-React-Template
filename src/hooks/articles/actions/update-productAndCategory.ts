import { useQueryClient } from "@tanstack/react-query";
import { useUpdateArticleProductAndCategoryMutation } from "../mutations/use-articles.mutations";

export const useUpdateArticleProductAndCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isArticleProductAndCategoryUpdatePending } =
    useUpdateArticleProductAndCategoryMutation();

  const updateArticleProductAndCategory = async (
    articleId: string,
    payload: { title: string },
  ) => {
    await mutateAsync({ articleId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    updateArticleProductAndCategory,
    isArticleProductAndCategoryUpdatePending,
  };
};
