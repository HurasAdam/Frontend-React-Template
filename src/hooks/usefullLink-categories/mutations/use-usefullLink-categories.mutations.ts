import { useMutation } from "@tanstack/react-query";
import type { CreateUsefullLinkCategoryPayload } from "../../../features/usefull-link-categories/validation/usefullLinkCategory.schema";
import { usefullLinkCategoryService } from "../../../services/usefullLink-category/usefullLink-category.service";

export const useCreateUsefullLinkCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: CreateUsefullLinkCategoryPayload) =>
      usefullLinkCategoryService.create(data),
  });
};
