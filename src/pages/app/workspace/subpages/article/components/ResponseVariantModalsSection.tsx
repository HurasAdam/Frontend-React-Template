import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../../../components/shared/ConfirmDialog";
import { useAddWorkspaceArticleResponseVariant } from "../../../../../../hooks/workspace-article-responseVariants/actions/add";
import { useDeleteWorkspaceArticleResponseVariant } from "../../../../../../hooks/workspace-article-responseVariants/actions/delete";
import { useUpdateWorkspaceArticleResponseVariant } from "../../../../../../hooks/workspace-article-responseVariants/actions/update";
import type {
  ArticleVariantModalType,
  IArticleVariantInfo,
} from "../hooks/useResponseVariantModal";
import {
  AddArticleResponseVariantModal,
  type AddWorkspaceArticleResponseVariantPayload,
} from "../modals/AddArticleResponseVariantModal";
import {
  EditArticleResponseVariantModal,
  type UpdateWorkspaceArticleResponseVariantPayload,
} from "../modals/EditArticleResponseVariantModal";

interface Props {
  type: ArticleVariantModalType;
  isOpen: boolean;
  onClose: () => void;
  variant: IArticleVariantInfo | null;
}

export default function ResponseVariantModalsSection({
  type,
  isOpen,
  onClose,
  variant,
}: Props) {
  const { articleId } = useParams<{
    id: string;
    articleId: string;
  }>();

  const { addResponseVariant, isAddPending } =
    useAddWorkspaceArticleResponseVariant();

  const { updateResponseVariant, isUpdatePending } =
    useUpdateWorkspaceArticleResponseVariant();

  const { deleteResponseVariant, isDeletePending } =
    useDeleteWorkspaceArticleResponseVariant();

  const onAdd = async (payload: AddWorkspaceArticleResponseVariantPayload) => {
    try {
      await addResponseVariant(payload);
      onClose();
      toast.success("Dodano nowy wariant szablonu");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description: "Nie masz uprawnień do edycji artykułów w tej kolekcji",
        });
        onClose();
        return;
      }
      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onUpdate = async (
    responseVariantId: string,
    payload: UpdateWorkspaceArticleResponseVariantPayload,
  ) => {
    try {
      await updateResponseVariant(articleId!, responseVariantId, payload);
      onClose();

      toast.success("Wariant szablonu został zaktualizowany");
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 409) {
        toast.error("Nazwa wariantu jest już zajęta", {
          description:
            "Wybierz inną nazwę. Nazwy wariantów szablonów  w obrębie artykułu muszą być unikalne.",
        });
        return;
      }

      toast.error("Nie udało się zaktualizować wariantu szablonu.");
    }
  };

  const onDelete = async (responseVariantId: string) => {
    try {
      await deleteResponseVariant(articleId!, responseVariantId);

      onClose();
      toast.success("Wariant szablonu został usunięty");
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 409) {
        toast.error("Nie można usunąć wariantu szablonu", {
          description:
            "Artykuł musi posiadać co najmniej jeden wariant szablonu odpowiedzi.",
        });
        onClose();
        return;
      }
      toast.error("Wystapił błąd");
      onClose();
    }
  };

  if (!type) return null;

  switch (type) {
    case "add":
      return (
        <AddArticleResponseVariantModal
          isOpen={isOpen}
          onClose={onClose}
          workspaceArticleId={articleId!}
          nextOrder={0}
          isPending={isAddPending}
          onSubmitVariant={(data) => {
            onAdd(data);
          }}
        />
      );

    case "edit":
      if (!variant) return null;

      return (
        <EditArticleResponseVariantModal
          isOpen={isOpen}
          onClose={onClose}
          variant={variant}
          isPending={isUpdatePending}
          onSubmitVariant={(responseVariantId, data) => {
            onUpdate(responseVariantId, data);
          }}
        />
      );

    case "delete":
      if (!variant) return null;

      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Usunąć wersję odpowiedzi?"
          type="warning"
          onCancel={onClose}
          onConfirm={() => onDelete(variant.id)}
          requireConfirmation
          isConfirmEnabled
          isLoading={isDeletePending}
        >
          Czy na pewno chcesz usunąć wersję <b>{variant.variantName}</b>?
          <br />
          Ta operacja jest nieodwracalna.
        </ConfirmDialog>
      );
  }
}
