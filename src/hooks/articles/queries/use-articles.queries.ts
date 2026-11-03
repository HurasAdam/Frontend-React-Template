import { useQuery } from "@tanstack/react-query";
import { articleServie } from "../../../services/articles/article.service";

export const useFindArticlesQuery = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => articleServie.find(),
  });
};

export const useFindArticleQuery = (articleId?: string) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => articleServie.findOne(articleId!),
    enabled: !!articleId,
  });
};
