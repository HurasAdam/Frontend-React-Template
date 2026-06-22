import { useMutation } from "@tanstack/react-query";
import type { CreateTagPayload } from "../../../features/tags/validation/tag.schema";
import { tagService } from "../../../services/tags/tag.service";

export const useCreateTagMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateTagPayload) => {
      return tagService.create(payload);
    },
  });
};

export const useUpdateTagMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTagPayload }) => {
      return tagService.updateOne(id, data);
    },
  });
};
