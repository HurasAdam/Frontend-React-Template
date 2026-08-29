import { useQueryClient } from "@tanstack/react-query";
import type { AddWorkspaceArticleResponseVariantPayload } from "../../../pages/app/workspace/subpages/article/modals/AddArticleResponseVariantModal";
import { useAddWorkspaceArticleResponseVariantMutation } from "../mutations/use-workspace-article-responseVariants.mutations";

export const useAddWorkspaceArticleResponseVariant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isAddPending } =
    useAddWorkspaceArticleResponseVariantMutation();

  const addResponseVariant = async (
    payload: AddWorkspaceArticleResponseVariantPayload,
  ) => {
    await mutateAsync(payload);

    await queryClient.invalidateQueries({
      queryKey: ["workspace-article", payload.workspaceArticleId],
    });
  };

  return {
    addResponseVariant,
    isAddPending,
  };
};
