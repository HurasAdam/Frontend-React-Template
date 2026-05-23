import { toast } from "sonner";
import queryClient from "../../../config/query.config";
import { useDeleteProductCategoryMutate } from "../mutations/use-product-categories.mutations";

interface Props {
  categoryId: string;
  categoryName: string;
  onSuccess?: () => void;
}

export const useDeleteProductCategoryAction = (productId?: string) => {
  const { mutate, isPending } = useDeleteProductCategoryMutate();

  const deleteCategory = ({ categoryId, categoryName, onSuccess }: Props) => {
    mutate(categoryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["product", productId],
        });

        toast.success(`Kategoria ${categoryName} została usunięta`, {
          position: "bottom-right",
        });

        onSuccess?.();
      },
    });
  };

  return {
    deleteCategory,
    isPending,
  };
};
