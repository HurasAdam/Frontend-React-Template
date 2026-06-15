import API from "../../config/api.config";
import type { CreateUsefullLinkCategoryPayload } from "../../features/usefull-link-categories/validation/usefullLinkCategory.schema";

const BASEURL = "/api/usefull-link-categories";

const create = (payload: CreateUsefullLinkCategoryPayload) => {
  return API.post(BASEURL, payload);
};

const find = () => {
  return API.get(`${BASEURL}`);
};

export const usefullLinkCategoryService = {
  create,
  find,
};
