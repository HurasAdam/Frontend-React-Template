import { useMutation } from "@tanstack/react-query";
import { workspaceService } from "../../../services/workspaces/workspaces.service";

export const useAddWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (payload) => workspaceService.add(payload),
  });
};

export const useUpdateWorkspaceMutation = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      payload,
    }: {
      workspaceId: string;
      payload: unknown;
    }) => workspaceService.updateOne(workspaceId, payload),
  });
};
