import type { AxiosError } from "axios";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../components/shared/ConfirmDialog";
import { useApproveArticle } from "../../../../hooks/articles/actions/approve";
import { useRequestArticleChanges } from "../../../../hooks/articles/actions/request-changes";
import { useSubmitArticleForReview } from "../../../../hooks/articles/actions/submit-for-review";
import { useVerifyArticle } from "../../../../hooks/articles/actions/verify";
import type { ArticleModalType } from "../hooks/useArticleModal";
import { EditArticleModal } from "../modals/EditArticleModal";
import { RequestArticleChangesModal } from "../modals/RequestArticleChangesModal";

interface Props {
  type: ArticleModalType;
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  article: {};
  articleTitle: string;
  changeRequestNote: string | null;

  isPending: boolean;
}

export default function ArticleModalsSection({
  type,
  isOpen,
  article,
  onClose,
  articleId,
  articleTitle,
  changeRequestNote,

  isPending,
}: Props) {
  const { approveArticle, isApprovePending } = useApproveArticle();
  const { verifyArticle, isVerifyPending } = useVerifyArticle();
  const { requestArticleChanges } = useRequestArticleChanges();
  const { submitArticleForReview, isSubmitForReviewPending } =
    useSubmitArticleForReview();

  const onApprove = async (articleId: string) => {
    try {
      await approveArticle(articleId);
      onClose();
      toast.success("Artykuł został zweryfikowany i zatwierdzony");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Nie masz uprawnień do zatwierdzania nowo dodanych artykułów",
        });

        onClose();
        return;
      }

      if (status === 409) {
        toast.error("Nie można zatwierdzić artykułu", {
          description:
            "Artykuł nie znajduje się w stanie pozwalającym na zatwierdzenie.",
        });

        onClose();
        return;
      }

      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onVerify = async (articleId: string) => {
    try {
      await verifyArticle(articleId);
      onClose();
      toast.success("Artykuł został zweryfikowany");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Nie masz uprawnień do zatwierdzania nowo dodanych artykułów",
        });

        onClose();
        return;
      }

      if (status === 409) {
        toast.error("Nie można zatwierdzić artykułu", {
          description:
            "Artykuł nie znajduje się w stanie pozwalającym na zatwierdzenie.",
        });

        onClose();
        return;
      }

      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onRequestChanges = async (payload: { reviewNote: string }) => {
    try {
      await requestArticleChanges(articleId, payload);
      onClose();
      toast.success("Uwagi zostały wysłane do autora artykułu");
    } catch (error) {}
  };

  const onSubmitForReview = async (articleId: string) => {
    try {
      await submitArticleForReview(articleId);
      onClose();
      toast.success("Artykuł został przesłany do ponownej weryfikacji");

      return;
    } catch (error) {}
  };

  if (!type) return null;

  switch (type) {
    case "approve":
      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Zatwierdzić artykuł?"
          onCancel={onClose}
          onConfirm={() => onApprove(articleId)}
          isConfirmEnabled
          isLoading={isPending}
        >
          Czy na pewno chcesz zatwierdzić artykuł{" "}
          <strong>{articleTitle}</strong>?
          <br />
          Artykuł zostanie oznaczony jako zweryfikowany i opublikowany, jeśli
          nie został jeszcze opublikowany.
        </ConfirmDialog>
      );

    case "verify":
      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Zatwierdzić artykuł?"
          onCancel={onClose}
          onConfirm={() => onVerify(articleId)}
          isConfirmEnabled
          isLoading={isPending}
        >
          Czy na pewno chcesz zatwierdzić artykuł{" "}
          <strong className="text-primary">{articleTitle}</strong>?
          <br />
          Po zatwierdzeniu artykuł zostanie oznaczony jako zweryfikowany
        </ConfirmDialog>
      );

    case "submitForReview":
      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Przekazać do ponownej weryfikacji?"
          onCancel={onClose}
          onConfirm={() => onSubmitForReview(articleId)}
          isConfirmEnabled
          isLoading={isSubmitForReviewPending}
        >
          Czy chcesz przekazać artykuł{" "}
          <strong className="text-primary">{articleTitle}</strong> do ponownego
          sprawdzenia?
          <br />
          Artykuł wróci do procesu weryfikacji po naniesieniu wymaganych zmian.
        </ConfirmDialog>
      );

    case "archivize":
      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Przenieść artykuł do archiwum?"
          type="warning"
          onCancel={onClose}
          onConfirm={onArchivize}
          requireConfirmation
          isConfirmEnabled
          isLoading={isPending}
        >
          Czy na pewno chcesz przenieść artykuł <strong>{articleTitle}</strong>{" "}
          do archiwum?
          <br />
          Artykuł zostanie wycofany z bieżącego użytku, ale jego treść
          pozostanie zachowana.
        </ConfirmDialog>
      );
    case "request-changes":
      return (
        <RequestArticleChangesModal
          isOpen={isOpen}
          onClose={onClose}
          articleTitle={articleTitle}
          isPending={isPending}
          onSubmit={onRequestChanges}
        />
      );

    case "edit":
      return (
        <EditArticleModal
          isOpen={isOpen}
          onClose={onClose}
          article={article ?? {}}
          isPending={isPending}
          onSubmitArticle={() => {}}
        />
      );
    // case "view-change-request":
    //   return (
    //     <ViewChangeRequestModal
    //       isOpen={isOpen}
    //       onClose={onClose}
    //       note={changeRequestNote}
    //     />
    //   );

    default:
      return null;
  }
}
