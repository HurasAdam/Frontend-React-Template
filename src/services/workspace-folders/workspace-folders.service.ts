import API from "../../config/api.config";
import type { IFolderFormData } from "../../hooks/workspace-folders/mutations/types/workspace-folders.mutation.types";

const BASE_URL = "/api/workspace-folders";

const add = (workspaceId: string, payload: IFolderFormData) => {
  return API.post(`${BASE_URL}`, {
    workspaceId,
    ...payload,
  });
};

const findAllByWorkspace = (workspaceId: string) => {
  return API.get(`${BASE_URL}/workspace/${workspaceId}`);
};

const updateOne = (folderId: string, payload: IFolderFormData) => {
  return API.patch(`${BASE_URL}/${folderId}`, payload);
};

const deleteOne = (folderId: string) => {
  return API.delete(`${BASE_URL}/${folderId}`);
};

export const workspaceFoldersService = {
  add,
  findAllByWorkspace,
  updateOne,
  deleteOne,
};
