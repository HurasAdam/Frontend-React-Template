import API from "../../config/api.config";

const BASE_URL = "/api/workspace-articles";

const add = (payload) => {
  console.log("PP", payload);
  return API.post(`${BASE_URL}`, payload);
};

export const workspaceArticlesService = {
  add,
};
