import API from "../../config/api.config";

const BASE_URL = "/api/workspaces";

const add = (payload: any) => {
  return API.post(`${BASE_URL}`, payload);
};

const find = () => {
  return API.get(`${BASE_URL}`);
};

const findOne = (workspaceId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}`);
};

export const workspaceService = {
  add,
  find,
  findOne,
};
