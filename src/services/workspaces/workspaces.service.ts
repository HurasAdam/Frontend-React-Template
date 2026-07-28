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

const updateOne = (workspaceId: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${workspaceId}`, payload);
};

export const workspaceService = {
  add,
  find,
  findOne,
  updateOne,
};
