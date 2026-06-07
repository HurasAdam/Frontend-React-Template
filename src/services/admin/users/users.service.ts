import API from "../../../config/api.config";
import type { IFindOneWithDetailsResponse } from "./users.types";

const BASE_URL = "/api/admin";

const create = (payload) => {
  return API.post(`${BASE_URL}/create-user`, payload);
};

const findOneWithDetails = (
  id: string,
): Promise<IFindOneWithDetailsResponse> => {
  return API.get(`${BASE_URL}/users/${id}`);
};

const resetPassword = (id: string): Promise<{ temporaryPassword: string }> => {
  return API.post(`${BASE_URL}/users/${id}/reset-password`);
};

const changeUserRole = (id: string, roleId: string) => {
  return API.patch(`${BASE_URL}/users/${id}/role`, { roleId });
};

export const usersService = {
  create,
  findOneWithDetails,
  resetPassword,
  changeUserRole,
};
