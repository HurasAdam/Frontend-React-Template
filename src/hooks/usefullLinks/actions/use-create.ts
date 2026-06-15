import { toast } from "sonner";
import queryClient from "../../../config/query.config";
import type { CreateUsefullLinkPayload } from "../../../features/usefull-links/validation/usefullLink.schema";
import { useCreateUsefullLinkMutation } from "../mutations/use-usefullLinks.mutations";

interface CreateUsefullLinkParams {
  data: CreateUsefullLinkPayload;
  onSuccess?: () => void;
}
export function useCreateUsefullLinkAction() {
  const { mutate, isPending } = useCreateUsefullLinkMutation();

  const createUsefullLink = ({ data, onSuccess }: CreateUsefullLinkParams) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Dodano nowy LINK", {
          position: "bottom-right",
        });
        queryClient.invalidateQueries({
          queryKey: ["usefull-links-with-category"],
        });
        onSuccess?.();
      },
    });
  };
  return {
    createUsefullLink,
    isPending,
  };
}
