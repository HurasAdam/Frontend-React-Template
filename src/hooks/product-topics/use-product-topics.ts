import { useMutation } from "@tanstack/react-query";
import { productTopicService } from "../../services/product-topic/product-topic.service";

export const useCreateProductTopicMutation = () => {
  return useMutation({
    mutationFn: (payload: { product: string; name: string }) =>
      productTopicService.create(payload),
  });
};
