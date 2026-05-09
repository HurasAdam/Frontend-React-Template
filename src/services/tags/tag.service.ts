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
export const tagService = {
  create,
  find,
};
