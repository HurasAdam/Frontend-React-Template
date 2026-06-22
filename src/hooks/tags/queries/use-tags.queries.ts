import { useQuery } from "@tanstack/react-query";
import { tagService } from "../../../services/tags/tag.service";

export const useFindTagsQuery = (params: { name: string }) => {
  return useQuery({
    queryKey: ["tags", params.name],
    queryFn: () => {
      return tagService.find(params);
    },
  });
};

export const useFindTagsWithDetailsQuery = (params: { name: string }) => {
  return useQuery({
    queryKey: ["tags-with-details", params.name],
    queryFn: () => {
      return tagService.findWithDetails(params);
    },
  });
};

export const useFindOneTagQuery = (id?: string | null) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => tagService.findOne(id as string),
    enabled: !!id,
  });
};
