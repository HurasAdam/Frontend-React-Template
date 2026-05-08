import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreateTagPayload } from "../../features/tags/validation/tag.schema";
import { tagService } from "../../services/tags/tag.service";

export const useCreateTagMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateTagPayload) => {
      return tagService.create(payload);
    },
  });
};

export const useFindTagsQuery = (params: { name: string }) => {
  return useQuery({
    queryKey: ["tags", params.name],
    queryFn: () => {
      return tagService.find(params);
    },
  });
};
