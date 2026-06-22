import { useQuery } from "@tanstack/react-query";
import { productCategoryService } from "../../../services/product-category/product-category.service";

export const useFindCategoriesByProductQuery = (productId: string | null) => {
  return useQuery({
    queryKey: ["categories-by-product", productId],
    queryFn: () => productCategoryService.findByProduct(productId as string),
    enabled: !!productId,
  });
};

export const useFindOneProductCategoryQuery = (id: string | null) => {
  return useQuery({
    queryKey: ["product-category", id],
    queryFn: () => productCategoryService.findOne(id as string),
    enabled: !!id,
  });
};
