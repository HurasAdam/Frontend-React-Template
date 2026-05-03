import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../features/products/validation/product.schema";
import { productService } from "../../services/product.service";

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProductPayload) => {
      return productService.create(data);
    },
  });
};

export const useFindProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return productService.find();
    },
  });
};
