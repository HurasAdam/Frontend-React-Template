import { useMutation } from "@tanstack/react-query";
import { productTopicService } from "../../../services/product-topic/product-topic.service";

export const useCreateProductTopicMutation = () => {
  return useMutation({
    mutationFn: (payload: { product: string; name: string }) =>
      productTopicService.create(payload),
  });
};

export const useUpdateOneProductTopicMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { name: string };
    }) => {
      return productTopicService.updateOne(id, payload);
    },
  });
};

export const useDeleteOneProductTopicMutation = () => {
  return useMutation({
    mutationFn: (id: string) => productTopicService.deleteOne(id),
  });
};
