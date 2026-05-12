import { useMutation } from "@tanstack/react-query";
import type { ProductCategoryFormData } from "../../features/products/validation/product-category.schema";
import { productCategoryService } from "../../services/product-category/product-category.service";

export const useCreateProductCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: ProductCategoryFormData) =>
      productCategoryService.create(data),
  });
};
