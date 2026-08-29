import API from "../../config/api.config";

const BASE_URL = "/api/workspace-article-response-variants";

const add = (payload) => {
  console.log("PP", payload);
  return API.post(`${BASE_URL}`, payload);
};

const findOne = (workspaceId: string, articleId: string) => {
  return API.get(`${BASE_URL}/${workspaceId}/articles/${articleId}`);
};

const updateOne = (responseVariantId: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${responseVariantId}`, payload);
};

const deleteOne = (responseVariantId: string) => {
  return API.delete(`${BASE_URL}/${responseVariantId}`);
};

export const workspaceArticleResponseVariantsService = {
  add,
  findOne,
  updateOne,
  deleteOne,
};
