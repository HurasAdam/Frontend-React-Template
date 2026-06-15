import { useQuery } from "@tanstack/react-query";
import { usefullLinksService } from "../../../services/usefullLinks/useUsefullLink.service";

export const useFindUsefullLinksQuery = () => {
  return useQuery({
    queryKey: ["usefull-links"],
    queryFn: () => usefullLinksService.find(),
  });
};

export const useFindUsefullLinksWithCategoryQuery = () => {
  return useQuery({
    queryKey: ["usefull-links-with-category"],
    queryFn: () => usefullLinksService.findWithCategory(),
  });
};

export const useFindOneWithDetailsUsefullLinkQuery = (id?: string | null) => {
  return useQuery({
    queryKey: ["usefull-link-with-details", id],
    queryFn: () => usefullLinksService.findOneWithDetails(id as string),
    enabled: !!id,
  });
};
