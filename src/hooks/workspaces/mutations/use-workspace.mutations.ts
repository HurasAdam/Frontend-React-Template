import { useMutation } from "@tanstack/react-query";
import { workspaceService } from "../../../services/workspaces/workspaces.service";

export const useAddWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (payload) => workspaceService.add(payload),
  });
};
