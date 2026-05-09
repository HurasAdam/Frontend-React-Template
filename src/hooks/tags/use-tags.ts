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

export const useFindOneTagQuery = (id?: string | null) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => tagService.findOne(id as string),
    enabled: !!id,
  });
};

export const useUpdateTagMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTagPayload }) => {
      return tagService.updateOne(id, data);
    },
  });
};
