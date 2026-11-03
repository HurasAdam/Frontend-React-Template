import { useQueryClient } from "@tanstack/react-query";
import { useVerifyArticleMutation } from "../mutations/use-articles.mutations";

export const useVerifyArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isVerifyPending } =
    useVerifyArticleMutation();

  const verifyArticle = async (articleId: string) => {
    await mutateAsync(articleId);

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    verifyArticle,
    isVerifyPending,
  };
};
