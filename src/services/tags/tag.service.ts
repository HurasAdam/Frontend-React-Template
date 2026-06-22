import API from "../../config/api.config";
import type { ITag } from "../../features/tags/hooks/useTagModal";
import type { CreateTagPayload } from "../../features/tags/validation/tag.schema";

const BASE_URL = "/api/tags";

const create = (payload: CreateTagPayload) => {
  return API.post(BASE_URL, payload);
};

const find = (filters: { name: string }): Promise<ITag[]> => {
  return API.get(BASE_URL, {
    params: filters.name ? { name: filters.name } : {},
  });
};

const findWithDetails = (filters: { name: string }): Promise<ITag[]> => {
  return API.get(`${BASE_URL}/details`, {
    params: filters.name ? { name: filters.name } : {},
  });
};

const updateOne = (id: string, data: unknown) => {
  return API.patch(`${BASE_URL}/${id}`, data);
};

const findOne = (id: string): Promise<ITag> => {
  return API.get(`${BASE_URL}/${id}`);
};
export const tagService = {
  create,
  find,
  findWithDetails,
  findOne,
  updateOne,
};
