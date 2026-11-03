import { EditedArticleBanner } from "./EditedArticleBanner";
import { InitialApprovalBanner } from "./InitialApprovalBanner";
import { PeriodicReverificationBanner } from "./PeriodicReverificationBanner";

export type ArticleReviewStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "REQUIRES_REVERIFICATION"
  | "CHANGES_REQUESTED";

export type ArticlePublicationStatus = "UNPUBLISHED" | "PUBLISHED" | "ARCHIVED";

type Props = {
  reviewStatus: ArticleReviewStatus;
  lastVerifiedAt: string | null;
  publicationStatus: ArticlePublicationStatus;
  onApprove: () => void;
  onRequestChanges: () => void;
  onVerify: () => void;
};

export function ArticleReviewBanner({
  reviewStatus,
  publicationStatus,
  lastVerifiedAt,
  onApprove,
  onRequestChanges,
  onVerify,
}: Props) {
  if (reviewStatus === "DRAFT" && publicationStatus === "UNPUBLISHED") {
    return (
      <InitialApprovalBanner
        onApprove={onApprove}
        onRequestChanges={onRequestChanges}
      />
    );
  }

  if (reviewStatus === "PENDING_REVIEW" && publicationStatus === "PUBLISHED") {
    return <EditedArticleBanner onVerify={onVerify} />;
  }

  if (
    reviewStatus === "APPROVED" &&
    publicationStatus === "PUBLISHED" &&
    lastVerifiedAt &&
    isReverificationRequired(lastVerifiedAt)
  ) {
    return <PeriodicReverificationBanner onVerify={onVerify} />;
  }

  return null;
}

function isReverificationRequired(lastVerifiedAt: string): boolean {
  const lastVerifiedDate = new Date(lastVerifiedAt);

  if (Number.isNaN(lastVerifiedDate.getTime())) {
    return false;
  }

  const deadline = new Date(lastVerifiedDate);
  deadline.setFullYear(deadline.getFullYear() + 1);

  return Date.now() >= deadline.getTime();
}
