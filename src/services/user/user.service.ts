import API from "../../config/api.config";

const BASE_URL = "/api/users";

const find = () => {
  return API.get(BASE_URL);
};

export const userService = {
  find,
};
