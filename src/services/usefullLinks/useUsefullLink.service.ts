import API from "../../config/api.config";
import type { IFindOneUsefullLinkWithDetailsResponse } from "./usefullLink.types";

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

const findOne = (id: string) => {
  return API.get(`${BASE_URL}/${id}`);
};

const findOneWithDetails = (
  id: string,
): Promise<IFindOneUsefullLinkWithDetailsResponse> => {
  return API.get(`${BASE_URL}/${id}/details`);
};

export const usefullLinksService = {
  create,
  find,
  findWithCategory,
  findOne,
  findOneWithDetails,
};
