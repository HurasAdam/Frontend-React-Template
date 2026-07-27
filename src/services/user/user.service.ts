import API from "../../config/api.config";

const BASE_URL = "/api/users";

const find = () => {
  return API.get(BASE_URL);
};

const findWithDetails = () => {
  return API.get(`${BASE_URL}/details`);
};

const findWorkspaceCandidates = () => {
  return API.get(`${BASE_URL}/workspace-candidates`);
};

export const userService = {
  find,
  findWithDetails,
  findWorkspaceCandidates,
};
