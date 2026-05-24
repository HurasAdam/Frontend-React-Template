import { useMutation } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../../features/products/validation/product.schema";
import { productService } from "../../../services/product/product.service";

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProductPayload) => {
      return productService.create(data);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: unknown }) => {
      return productService.updateOne(id, payload);
    },
  });
};
