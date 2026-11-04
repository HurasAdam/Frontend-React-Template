import { useQuery } from "@tanstack/react-query";
import { articleAuditLogsServie } from "../../../services/article-audit-logs/article-audit-logs.service";

export const useFindByArticleQuery = (articleId?: string) => {
  return useQuery({
    queryKey: ["article-audit-logs"],
    queryFn: () => articleAuditLogsServie.findByArticleId(articleId!),
    enabled: !!articleId,
  });
};
