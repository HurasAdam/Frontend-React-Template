import API from "../../config/api.config";

const BASE_URL = "/api/article-response-variants";

const add = (payload) => {
  return API.post(`${BASE_URL}/create`, payload);
};

const deleteOne = (variantId: string) => {
  return API.delete(`${BASE_URL}/${variantId}`);
};

const updateOne = (variantId: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${variantId}`, payload);
};

export const articleResponseVariantsServie = {
  add,
  deleteOne,
  updateOne,
};
