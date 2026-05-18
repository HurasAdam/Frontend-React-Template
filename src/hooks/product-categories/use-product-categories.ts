import { useMutation, useQuery } from "@tanstack/react-query";
import type { ProductCategoryFormData } from "../../features/products/validation/product-category.schema";
import { productCategoryService } from "../../services/product-category/product-category.service";

export const useCreateProductCategoryMutation = () => {
  return useMutation({
    mutationFn: (data: ProductCategoryFormData) =>
      productCategoryService.create(data),
  });
};

export const useFindOneProductCategoryQuery = (id: string | null) => {
  return useQuery({
    queryKey: ["product-category", id],
    queryFn: () => productCategoryService.findOne(id as string),
    enabled: !!id,
  });
};

export const useUpdateProductCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string } }) =>
      productCategoryService.updateOne(id, payload),
  });
};

export const useDeleteProductCategoryMutate = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return productCategoryService.deleteOne(id);
    },
  });
};
