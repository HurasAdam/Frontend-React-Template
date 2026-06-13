import { toast } from "sonner";
import queryClient from "../../../config/query.config";
import type { CreateUsefullLinkCategoryPayload } from "../../../features/usefull-link-categories/validation/usefullLinkCategory.schema";
import { useCreateUsefullLinkCategoryMutation } from "../mutations/use-usefullLink-categories.mutations";

interface Props {
  data: CreateUsefullLinkCategoryPayload;

  onSuccess: () => void;
}

export function useCreateUsefullLinkCategoryAction() {
  const { mutate, isPending } = useCreateUsefullLinkCategoryMutation();

  const createUsefullLinkCategory = ({ data, onSuccess }: Props) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["usefull-link-categories"],
        });
        toast.success("Dodano nową kategorię", {
          position: "bottom-right",
        });
        onSuccess?.();
      },
    });
  };

  return {
    createUsefullLinkCategory,
    isPending,
  };
}
