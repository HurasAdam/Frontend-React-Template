import API from "../../config/api.config";

const BASE_URL = "/api/workspace-articles";

const add = (payload) => {
  console.log("PP", payload);
  return API.post(`${BASE_URL}`, payload);
};

const findOne = (workspaceId: string, articleId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/articles/${articleId}`);
};

const findByFolder = (workspaceId: string, folderId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/folders/${folderId}/articles`);
};

export const workspaceArticlesService = {
  add,
  findOne,
  findByFolder,
};
