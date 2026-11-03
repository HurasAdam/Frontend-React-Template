import { useQueryClient } from "@tanstack/react-query";
import { useSubmitArticleForReviewMutation } from "../mutations/use-articles.mutations";

export const useSubmitArticleForReview = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isSubmitForReviewPending } =
    useSubmitArticleForReviewMutation();

  const submitArticleForReview = async (articleId: string) => {
    await mutateAsync(articleId);

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    submitArticleForReview,
    isSubmitForReviewPending,
  };
};
