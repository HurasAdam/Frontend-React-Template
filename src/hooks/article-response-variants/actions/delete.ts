import { useQueryClient } from "@tanstack/react-query";
import { useDeleteArticleResponseVariantMutation } from "../mutations/use-article-responseVariants.mutations";

export const useDeleteArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isDeletePending } =
    useDeleteArticleResponseVariantMutation();

  const deleteResponseVariant = async (
    articleId: string,
    variantId: string,
  ) => {
    await mutateAsync(variantId);

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    deleteResponseVariant,
    isDeletePending,
  };
};
