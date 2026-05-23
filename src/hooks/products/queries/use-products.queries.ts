import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/product/product.service";
import type {
  IFindOneWithDetailsProductResponse,
  IFindProductsResponse,
} from "../../../services/product/product.types";

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
