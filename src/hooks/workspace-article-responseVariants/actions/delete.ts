import { useQueryClient } from "@tanstack/react-query";
import { useDeleteWorkspaceArticleResponseVariantMutation } from "../mutations/use-workspace-article-responseVariants.mutations";

export const useDeleteWorkspaceArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isDeletePending } =
    useDeleteWorkspaceArticleResponseVariantMutation();

  const deleteResponseVariant = async (
    workspaceArticleId: string,
    responseVariantId: string,
  ) => {
    await mutateAsync(responseVariantId);

    await queryClient.invalidateQueries({
      queryKey: ["workspace-article", workspaceArticleId],
    });
  };

  return {
    deleteResponseVariant,
    isDeletePending,
  };
};
