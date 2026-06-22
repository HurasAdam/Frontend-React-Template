import { useQuery } from "@tanstack/react-query";
import { productTopicService } from "../../../services/product-topic/product-topic.service";

export const useFindAllTopicsQuery = () => {
  return useQuery({
    queryKey: ["all-topics"],
    queryFn: () => productTopicService.find(),
  });
};

export const useFindTopicsByProductQuery = (productId: string | null) => {
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
