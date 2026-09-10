import { useQuery } from "@tanstack/react-query";
import { workspaceMembersService } from "../../../services/workspace-members/workspace-members.service";

export const useFindMembersByWorkspaceQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () =>
      workspaceMembersService.findByWorkspaceId(workspaceId as string),
    enabled: !!workspaceId,
  });
};

export const useFindAvailableUsersByWorkspaceQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["workspace-candidates", workspaceId],
    queryFn: () =>
      workspaceMembersService.findAvailableByWorkspaceId(workspaceId as string),
    enabled: !!workspaceId,
  });
};
