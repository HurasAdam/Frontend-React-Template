import API from "../../config/api.config";

const BASE_URL = "/api/roles";

const create = (data: any): Promise<void> => {
  return API.post(BASE_URL, data);
};

const find = (filters: { name?: string }): Promise<any> => {
  return API.get(BASE_URL, {
    params: filters.name ? { name: filters.name } : {},
  });
};

const getPermissions = () => {
  return API.get(`${BASE_URL}/permissions`);
};

export const roleService = {
  create,
  find,
  getPermissions,
};
