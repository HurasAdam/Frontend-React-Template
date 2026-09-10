import { useMutation } from "@tanstack/react-query";
import { workspaceMembersService } from "../../../services/workspace-members/workspace-members.service";

export const useAddWorkspaceMembersMutation = () => {
  return useMutation({
    mutationFn: (payload) => workspaceMembersService.add(payload),
  });
};

export const useDeleteWorkspaceMemberMutation = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      memberId,
    }: {
      workspaceId: string;
      memberId: string;
    }) => workspaceMembersService.deleteOne(workspaceId, memberId),
  });
};

export const useTransferOwnership = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      memberId,
    }: {
      workspaceId: string;
      memberId: string;
    }) => workspaceMembersService.transferOwnership(workspaceId, memberId),
  });
};

export const useUpdatePermissionsMutation = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      memberId,
      permissions,
    }: {
      workspaceId: string;
      memberId: string;
      permissions: unknown;
    }) =>
      workspaceMembersService.updatePermissions(
        workspaceId,
        memberId,
        permissions,
      ),
  });
};
