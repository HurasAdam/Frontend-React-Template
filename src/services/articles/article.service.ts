import API from "../../config/api.config";
import type { FindArticlesQuery } from "./types";

const BASE_URL = "/api/articles";

const create = (payload) => {
  return API.post(`${BASE_URL}/create`, payload);
};

const find = (params: FindArticlesQuery = {}) => {
  return API.get(`${BASE_URL}`, { params });
};

const findOne = (articleId: string) => {
  return API.get(`${BASE_URL}/${articleId}`);
};

const approveOne = (articleId: string) => {
  return API.patch(`${BASE_URL}/${articleId}/approve`);
};

const verifyOne = (articleId: string) => {
  return API.patch(`${BASE_URL}/${articleId}/verify`);
};

const requestChanges = (articleId: string, paylod: { reviewNote: string }) => {
  return API.patch(`${BASE_URL}/${articleId}/request-changes`, {
    reviewNote: paylod,
  });
};

const submitForReview = (articleId: string) => {
  return API.patch(`${BASE_URL}/${articleId}/submit-for-review`);
};

const updateArticleTitle = (aritlceId: string, payload: {}) => {
  return API.patch(`${BASE_URL}/${aritlceId}/title`, payload);
};

const updateArticleInternalNote = (aritlceId: string, payload: {}) => {
  return API.patch(`${BASE_URL}/${aritlceId}/internal-note`, payload);
};

const updateArticleProductAndCategory = (aritlceId: string, payload: {}) => {
  return API.patch(`${BASE_URL}/${aritlceId}/product-category`, payload);
};

const updateArticleTags = (aritlceId: string, payload: {}) => {
  return API.patch(`${BASE_URL}/${aritlceId}/tags`, payload);
};

export const articleServie = {
  create,
  find,
  findOne,
  approveOne,
  verifyOne,
  requestChanges,
  submitForReview,
  updateArticleTitle,
  updateArticleInternalNote,
  updateArticleProductAndCategory,
  updateArticleTags,
};
