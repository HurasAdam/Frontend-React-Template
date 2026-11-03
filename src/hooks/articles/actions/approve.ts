import { useQueryClient } from "@tanstack/react-query";
import { useApproveArticleMutation } from "../mutations/use-articles.mutations";

export const useApproveArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isApprovePending } =
    useApproveArticleMutation();

  const approveArticle = async (articleId: string) => {
    await mutateAsync(articleId);

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    approveArticle,
    isApprovePending,
  };
};
