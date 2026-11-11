import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { articleServie } from "../../../services/articles/article.service";
import type { FindArticlesQuery } from "../../../services/articles/types";

export const useFindArticlesQuery = (params: FindArticlesQuery = {}) => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => articleServie.find(params),
    placeholderData: keepPreviousData,
  });
};

export const useFindDraftArticlesQuery = (params: FindArticlesQuery = {}) => {
  return useQuery({
    queryKey: ["draft-articles", params],
    queryFn: () => articleServie.findDraft(params),
    placeholderData: keepPreviousData,
  });
};

export const useFindReviewScheduledArticlesQuery = (
  params: FindArticlesQuery = {},
) => {
  return useQuery({
    queryKey: ["review-scheduled-articles", params],
    queryFn: () => articleServie.findReviewScheduled(params),
    placeholderData: keepPreviousData,
  });
};

export const useFindArticleQuery = (articleId?: string) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => articleServie.findOne(articleId!),
    enabled: !!articleId,
  });
};
