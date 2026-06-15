import API from "../../config/api.config";

const BASE_URL = "/api/usefull-links";

const create = (payload: any) => {
  return API.post(`${BASE_URL}`, payload);
};

const find = () => {
  return API.get(`${BASE_URL}`);
};

const findWithCategory = () => {
  return API.get(`${BASE_URL}/with-category`);
};

export const usefullLinksService = {
  create,
  find,
  findWithCategory,
};
