import { useMutation, useQuery } from "@tanstack/react-query";
import { productTopicService } from "../../services/product-topic/product-topic.service";

export const useCreateProductTopicMutation = () => {
  return useMutation({
    mutationFn: (payload: { product: string; name: string }) =>
      productTopicService.create(payload),
  });
};

export const useFindProductTopicsQuery = (productId: string | null) => {
  return useQuery({
    queryKey: ["product-topics", productId],
    enabled: !!productId,
    queryFn: () => productTopicService.find(),
  });
};

export const useFindOneProductTopicQuery = (topicId: string | null) => {
  return useQuery({
    queryKey: ["product-topic", topicId],
    enabled: !!topicId,
    queryFn: () => productTopicService.findOne(topicId as string),
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
