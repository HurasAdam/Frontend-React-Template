import { useQuery } from "@tanstack/react-query";
import { productCategoryService } from "../../../services/product-category/product-category.service";

export const useFindOneProductCategoryQuery = (id: string | null) => {
  return useQuery({
    queryKey: ["product-category", id],
    queryFn: () => productCategoryService.findOne(id as string),
    enabled: !!id,
  });
};
