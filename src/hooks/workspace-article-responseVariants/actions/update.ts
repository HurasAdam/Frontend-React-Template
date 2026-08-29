import { useQueryClient } from "@tanstack/react-query";
import type { UpdateWorkspaceArticleResponseVariantPayload } from "../../../pages/app/workspace/subpages/article/modals/EditArticleResponseVariantModal";
import { useUpdateWorkspaceArticleResponseVariantMutation } from "../mutations/use-workspace-article-responseVariants.mutations";

export const useUpdateWorkspaceArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdatePending } =
    useUpdateWorkspaceArticleResponseVariantMutation();

  const updateResponseVariant = async (
    workspaceArticleId: string,
    responseVariantId: string,
    payload: UpdateWorkspaceArticleResponseVariantPayload,
  ) => {
    await mutateAsync({ responseVariantId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["workspace-article", workspaceArticleId],
    });
  };

  return {
    updateResponseVariant,
    isUpdatePending,
  };
};
