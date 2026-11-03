import { useState } from "react";

export type ArticleModalType =
  | "approve"
  | "edit"
  | "verify"
  | "archivize"
  | "request-changes"
  | "view-change-request"
  | "submitForReview"
  | null;

export const useArticleModal = () => {
  const [type, setType] = useState<ArticleModalType>(null);

  const openApprove = () => setType("approve");
  const openEdit = () => setType("edit");
  const openVerify = () => setType("verify");
  const openArchivize = () => setType("archivize");
  const openRequestChanges = () => setType("request-changes");
  const openViewChangeRequest = () => setType("view-change-request");
  const openSubmitForReview = () => setType("submitForReview");

  const close = () => setType(null);

  return {
    type,
    isOpen: type !== null,
    openApprove,
    openEdit,
    openVerify,
    openArchivize,
    openRequestChanges,
    openViewChangeRequest,
    openSubmitForReview,
    close,
  };
};
