import { useMutation } from "@tanstack/react-query";
import { articleResponseVariantsServie } from "../../../services/article-response-variants/article-response-variants.service";

export const useAddArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: (payload) => articleResponseVariantsServie.add(payload),
  });
};

export const useUpdateArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: ({
      variantId,
      payload,
    }: {
      variantId: string;
      payload: { variantName: string; variantContent: string };
    }) => articleResponseVariantsServie.updateOne(variantId, payload),
  });
};

export const useDeleteArticleResponseVariantMutation = () => {
  return useMutation({
    mutationFn: (responseVariantId: string) =>
      articleResponseVariantsServie.deleteOne(responseVariantId),
  });
};
