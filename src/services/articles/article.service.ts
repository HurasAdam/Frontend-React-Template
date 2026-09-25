import API from "../../config/api.config";

const BASE_URL = "/api/articles";

const create = (payload) => {
  return API.post(`${BASE_URL}/create`, payload);
};

const find = () => {
  return API.get(`${BASE_URL}`);
};

export const articleServie = {
  create,
  find,
};
