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
