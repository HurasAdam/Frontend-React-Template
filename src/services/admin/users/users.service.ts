import API from "../../../config/api.config";

const BASE_URL = "/api/admin";

const create = (payload) => {
  return API.post(`${BASE_URL}/create-user`, payload);
};

export const usersService = {
  create,
};
