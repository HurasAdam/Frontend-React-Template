import { useMutation } from "@tanstack/react-query";
import type { UpdateWorkspaceArticleResponseVariantPayload } from "../../../pages/app/workspace/subpages/article/modals/EditArticleResponseVariantModal";
import { workspaceArticleResponseVariantsService } from "../../../services/workspace-article-responseVariants/workspace-article-responseVariants.service";

export const useAddWorkspaceArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: (payload) =>
      workspaceArticleResponseVariantsService.add(payload),
  });
};

export const useUpdateWorkspaceArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: ({
      responseVariantId,
      payload,
    }: {
      responseVariantId: string;
      payload: UpdateWorkspaceArticleResponseVariantPayload;
    }) =>
      workspaceArticleResponseVariantsService.updateOne(
        responseVariantId,
        payload,
      ),
  });
};

export const useDeleteWorkspaceArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: (responseVariantId: string) =>
      workspaceArticleResponseVariantsService.deleteOne(responseVariantId),
  });
};
