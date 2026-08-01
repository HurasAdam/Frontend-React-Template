import { useMutation } from "@tanstack/react-query";
import { workspaceFoldersService } from "../../../services/workspace-folders/workspace-folders.service";
import type {
  IAddFolderPayload,
  IUpdateFolderPayload,
} from "./types/workspace-folders.mutation.types";

export const useAddWorkspaceFolderMutation = () => {
  return useMutation({
    mutationFn: ({ workspaceId, payload }: IAddFolderPayload) =>
      workspaceFoldersService.add(workspaceId, payload),
  });
};

export const useUpdateWorkspaceFolderMutation = () => {
  return useMutation({
    mutationFn: ({ folderId, payload }: IUpdateFolderPayload) =>
      workspaceFoldersService.updateOne(folderId, payload),
  });
};

export const useDeleteWorkspaceFolderMutation = () => {
  return useMutation({
    mutationFn: (folderId: string) =>
      workspaceFoldersService.deleteOne(folderId),
  });
};
