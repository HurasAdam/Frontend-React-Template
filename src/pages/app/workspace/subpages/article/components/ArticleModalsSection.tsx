import type { AxiosError } from "axios";
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../../../components/shared/ConfirmDialog";
import { useUpdateWorkspaceArticle } from "../../../../../../hooks/workspace-articles/actions/update";
import { useDeleteWorkspaceFolder } from "../../../../../../hooks/workspace-folders/actions/delete";
import type { UpdateWorkspaceArticleFormData } from "../../../../../../validation/workspace-article/update";
import type { WorkspaceContext } from "../../settings/view/Settings";
import type {
  ArticleModalType,
  IArticleModalInfo,
} from "../hooks/useArticleModal";
import { EditWorkspaceArticleModal } from "../modals/EditWorkspaceArticleModal";

interface Props {
  type: ArticleModalType;
  isOpen: boolean;
  onClose: () => void;
  article: IArticleModalInfo;
}

export default function ArticleModalsSection({
  type,
  isOpen,
  onClose,
  article,
}: Props) {
  const { id: workspaceId } = useParams<{ id: string }>();
  const { folders } = useOutletContext<WorkspaceContext>();

  const { updateWorkspaceArticle, isUpdatePending } =
    useUpdateWorkspaceArticle();

  const { deleteFolder, isPending: isDeletePending } =
    useDeleteWorkspaceFolder();

  const onEdit = async (data: UpdateWorkspaceArticleFormData) => {
    if (!article || !workspaceId) {
      throw new Error("Missing required data");
    }
    try {
      await updateWorkspaceArticle({
        workspaceId,
        articleId: article.id,
        payload: data,
      });

      onClose();
      toast.success("Artykuł został zaktualizowany");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Nie masz uprawnień do edytowania artykułów w tej kolekcji.",
        });
        onClose();
        return;
      }

      if (status === 409) {
        toast.error("Nie można edytować artykułu", {
          description: "W wybranym folderze istnieje już artykuł o tym tytule.",
        });

        onClose();
        return;
      }
      toast.error("Nie udało się edytować artykułu", {
        description: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
      });
      onClose();
      return;
    }
  };

  const onDelete = async () => {
    if (!article || !workspaceId) {
      throw new Error("Missing required data");
    }
    try {
      await deleteFolder(article.id, workspaceId);

      onClose();
      toast.success("Artykuł został usunięty");
    } catch {
      toast.error("Nie udało się usunąć artykułu");
    }
  };

  if (!type) return;

  switch (type) {
    case "edit":
      if (!article) return null;
      return (
        <EditWorkspaceArticleModal
          isOpen={isOpen}
          isPending={isUpdatePending}
          onClose={onClose}
          onSave={onEdit}
          folders={folders}
          article={article}
        />
      );

    case "delete":
      if (!article) return null;

      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Usunąć folder?"
          type="warning"
          onCancel={onClose}
          onConfirm={onDelete}
          requireConfirmation
          isConfirmEnabled
          isLoading={isDeletePending}
        >
          Czy na pewno chcesz usunąć folder <b>{article.title}</b>?
          <br />
          Ta operacja jest nieodwracalna.
        </ConfirmDialog>
      );
  }
}
