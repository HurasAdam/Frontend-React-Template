import API from "../../config/api.config";

const BASE_URL = "/api/article-audit-logs";

const findByArticleId = (articleId: string) => {
  return API.get(`${BASE_URL}/${articleId}`);
};

export const articleAuditLogsServie = {
  findByArticleId,
};
