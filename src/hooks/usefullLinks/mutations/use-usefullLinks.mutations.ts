import { useMutation } from "@tanstack/react-query";
import { usefullLinksService } from "../../../services/usefullLinks/useUsefullLink.service";

export const useCreateUsefullLinkMutation = () => {
  return useMutation({
    mutationFn: (payload: any) => usefullLinksService.create(payload),
  });
};
