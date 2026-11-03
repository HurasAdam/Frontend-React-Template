import { useQueryClient } from "@tanstack/react-query";
import { useUpdateArticleResponseVariantMutation } from "../mutations/use-article-responseVariants.mutations";

export const useUpdateArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isDeletePending } =
    useUpdateArticleResponseVariantMutation();

  const updateResponseVariant = async (
    variantId: string,
    articleId: string,
    payload: unknown,
  ) => {
    await mutateAsync({ variantId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    updateResponseVariant,
    isDeletePending,
  };
};
