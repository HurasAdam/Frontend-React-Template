import { useQueryClient } from "@tanstack/react-query";
import { useAddArticleResponseVariantMutation } from "../mutations/use-article-responseVariants.mutations";

export const useAddArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } =
    useAddArticleResponseVariantMutation();

  const addResponseVariant = async (payload: {}) => {
    await mutateAsync(payload);

    await queryClient.invalidateQueries({
      queryKey: ["article", payload.articleId],
    });
  };

  return {
    addResponseVariant,
    isAddPending,
  };
};
