import { useMutation } from "@tanstack/react-query";
import { articleServie } from "../../../services/articles/article.service";

export const useCreateArticleMutation = () => {
  return useMutation({
    mutationFn: (payload) => articleServie.create(payload),
  });
};

export const useApproveArticleMutation = () => {
  return useMutation({
    mutationFn: (articleId: string) => articleServie.approveOne(articleId),
  });
};

export const useVerifyArticleMutation = () => {
  return useMutation({
    mutationFn: (articleId: string) => articleServie.verifyOne(articleId),
  });
};

export const useRequestArticleChangesMutation = () => {
  return useMutation({
    mutationFn: ({
      articleId,
      payload,
    }: {
      articleId: string;
      payload: { reviewNote: string };
    }) => articleServie.requestChanges(articleId, payload),
  });
};

export const useSubmitArticleForReviewMutation = () => {
  return useMutation({
    mutationFn: (articleId: string) => articleServie.submitForReview(articleId),
  });
};

export const useUpdateArticleTitleMutation = () => {
  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId: string; payload: {} }) =>
      articleServie.updateArticleTitle(articleId, payload),
  });
};

export const useUpdateArticleInternalNoteMutation = () => {
  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId: string; payload: {} }) =>
      articleServie.updateArticleInternalNote(articleId, payload),
  });
};

export const useUpdateArticleProductAndCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId: string; payload: {} }) =>
      articleServie.updateArticleProductAndCategory(articleId, payload),
  });
};

export const useUpdateArticleTagsMutation = () => {
  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId: string; payload: {} }) =>
      articleServie.updateArticleTags(articleId, payload),
  });
};
