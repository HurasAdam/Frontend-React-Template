import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../features/products/validation/product.schema";
import { productService } from "../../services/product/product.service";
import type {
  IFindOneWithDetailsProductResponse,
  IFindProductsResponse,
} from "../../services/product/product.types";

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProductPayload) => {
      return productService.create(data);
    },
  });
};

export const useFindProductsQuery = (filters: { name?: string }) => {
  return useQuery<IFindProductsResponse>({
    queryKey: ["products", filters.name],
    queryFn: () => {
      return productService.find(filters);
    },
  });
};

export const useFindOneWithDetailsProductQuery = (id?: string) => {
  return useQuery<IFindOneWithDetailsProductResponse>({
    queryKey: ["product", id],
    queryFn: () => productService.findOne(id as string),
    enabled: !!id,
  });
};
