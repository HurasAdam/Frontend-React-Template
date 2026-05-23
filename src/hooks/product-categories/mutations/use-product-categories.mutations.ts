import { useMutation } from "@tanstack/react-query";
import type { ProductCategoryFormData } from "../../../features/products/validation/product-category.schema";
import { productCategoryService } from "../../../services/product-category/product-category.service";

/**
 * ADD
 */

export const useCreateProductCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: ProductCategoryFormData) =>
      productCategoryService.create(data),
  });
};

/**
 * UPDATE
 */

export const useUpdateProductCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string } }) =>
      productCategoryService.updateOne(id, payload),
  });
};

/**
 * DELETE
 */

export const useDeleteProductCategoryMutate = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return productCategoryService.deleteOne(id);
    },
  });
};
