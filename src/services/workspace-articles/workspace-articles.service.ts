import API from "../../config/api.config";
import type { IFindByFolderResponse } from "./types";

const BASE_URL = "/api/workspace-articles";

const add = (payload) => {
  console.log("PP", payload);
  return API.post(`${BASE_URL}`, payload);
};

const findOne = (workspaceId: string, articleId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/articles/${articleId}`);
};

const findByFolder = (
  workspaceId: string,
  folderId: string,
): Promise<IFindByFolderResponse> => {
  return API.get(`${BASE_URL}/${workspaceId}/folders/${folderId}/articles`);
};

const updateOne = (workspaceId: string, articleId: string, payload: {}) => {
  return API.patch(`${BASE_URL}/${workspaceId}/articles/${articleId}`, payload);
};

export const workspaceArticlesService = {
  add,
  findOne,
  findByFolder,
  updateOne,
};
