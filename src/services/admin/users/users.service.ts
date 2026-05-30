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

export const usersService = {
  create,
  findOneWithDetails,
};
