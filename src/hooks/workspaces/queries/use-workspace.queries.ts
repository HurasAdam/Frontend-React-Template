import { useQuery } from "@tanstack/react-query";
import { workspaceService } from "../../../services/workspaces/workspaces.service";

export const useFindWorkspacesQuery = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspaceService.find(),
  });
};

export const useFindOneWorkspaceQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => workspaceService.findOne(workspaceId as string),
    enabled: !!workspaceId,
  });
};

export const useFindUserWorkspaceMembershipQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["workspace-membership", workspaceId],
    queryFn: () =>
      workspaceService.findUserWorkspaceMembership(workspaceId as string),
    enabled: !!workspaceId,
  });
};
