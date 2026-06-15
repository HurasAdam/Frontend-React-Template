import { useQuery } from "@tanstack/react-query";
import { usefullLinkCategoryService } from "../../../services/usefullLink-category/usefullLink-category.service";

export const useFindUsefullLinkCategoriesQuery = () => {
  return useQuery({
    queryKey: ["usefull-link-categories"],
    queryFn: () => usefullLinkCategoryService.find(),
  });
};
