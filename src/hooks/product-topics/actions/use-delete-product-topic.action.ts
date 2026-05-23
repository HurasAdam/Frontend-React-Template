import { toast } from "sonner";
import queryClient from "../../../config/query.config";
import { useDeleteOneProductTopicMutation } from "../mutations/use-product-topic-mutations";

interface Props {
  topicId: string;
  topicName: string;
  onSuccess: () => void;
}

export const useDeleteProductTopicAction = (productId?: string) => {
  const { mutate, isPending } = useDeleteOneProductTopicMutation();

  const deleteTopic = ({ topicId, topicName, onSuccess }: Props) => {
    mutate(topicId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        toast.success(`Temat kontaktu ${topicName} został usunięty`, {
          position: "bottom-right",
        });
        onSuccess?.();
      },
    });
  };

  return {
    deleteTopic,
    isPending,
  };
};
