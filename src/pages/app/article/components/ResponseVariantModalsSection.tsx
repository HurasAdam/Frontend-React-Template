import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../components/shared/ConfirmDialog";
import { useAddArticleResponseVariant } from "../../../../hooks/article-response-variants/actions/add";
import { useDeleteArticleResponseVariant } from "../../../../hooks/article-response-variants/actions/delete";
import { useUpdateArticleResponseVariant } from "../../../../hooks/article-response-variants/actions/update";

import type {
  ArticleVariantModalType,
  IArticleVariantInfo,
} from "../hooks/useArticleResponseVariantModal";
import { AddArticleResponseVariantModal } from "../modals/AddArticleReponseVariantModal";
import { EditArticleResponseVariantModal } from "../modals/EditArticleResponseVariantModal";
import { ManageResponseVariantsOrderModal } from "../modals/ManageResponseVariantsOrderModal";

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

  const { addResponseVariant, isAddPending } = useAddArticleResponseVariant();
  const { deleteResponseVariant, isDeletePending } =
    useDeleteArticleResponseVariant();

  const { updateResponseVariant } = useUpdateArticleResponseVariant();

  //   const { updateResponseVariant, isUpdatePending } =
  //     useUpdateWorkspaceArticleResponseVariant();

  //   const { deleteResponseVariant, isDeletePending } =
  //     useDeleteWorkspaceArticleResponseVariant();

  const onAdd = async (payload: {}) => {
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
    variantId: string,
    payload: { variantName: string; variantContent: string },
  ) => {
    try {
      await updateResponseVariant(variantId, articleId!, payload);
      onClose();
      toast.success("Wariant został zaktualizowany");
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description: "Nie masz uprawnień do edycji wariantów odpowiedzi.",
        });
        onClose();
        return;
      }

      if (status === 409) {
        toast.error("Nazwa wariantu jest już zajęta", {
          description:
            "Wybierz inną nazwę. Nazwy wariantów w obrębie artykułu muszą być unikalne.",
        });
        return;
      }
    }
  };

  const onDelete = async (articleId: string, variantId: string) => {
    try {
      await deleteResponseVariant(articleId, variantId);
      onClose();
      toast.success("Wariant odpowiedzi został usunięty");
    } catch {
      toast.error("Wystpaił błąd");
    }
  };

  //   const onUpdate = async (
  //     responseVariantId: string,
  //     payload: UpdateWorkspaceArticleResponseVariantPayload,
  //   ) => {
  //     try {
  //       await updateResponseVariant(articleId!, responseVariantId, payload);
  //       onClose();

  //       toast.success("Wariant szablonu został zaktualizowany");
  //     } catch (error) {
  //       const { status } = error as AxiosError;

  //       if (status === 409) {
  //         toast.error("Nazwa wariantu jest już zajęta", {
  //           description:
  //             "Wybierz inną nazwę. Nazwy wariantów szablonów  w obrębie artykułu muszą być unikalne.",
  //         });
  //         return;
  //       }

  //       toast.error("Nie udało się zaktualizować wariantu szablonu.");
  //     }
  //   };

  //   const onDelete = async (responseVariantId: string) => {
  //     try {
  //       await deleteResponseVariant(articleId!, responseVariantId);

  //       onClose();
  //       toast.success("Wariant szablonu został usunięty");
  //     } catch (error) {
  //       const { status } = error as AxiosError;

  //       if (status === 409) {
  //         toast.error("Nie można usunąć wariantu szablonu", {
  //           description:
  //             "Artykuł musi posiadać co najmniej jeden wariant szablonu odpowiedzi.",
  //         });
  //         onClose();
  //         return;
  //       }
  //       toast.error("Wystapił błąd");
  //       onClose();
  //     }
  //   };

  if (!type) return null;

  switch (type) {
    case "add":
      return (
        <AddArticleResponseVariantModal
          isOpen={isOpen}
          onClose={onClose}
          articleId={articleId!}
          nextOrder={0}
          isPending={false}
          onSubmitVariant={onAdd}
        />
      );

    case "edit":
      if (!variant) return null;

      return (
        <EditArticleResponseVariantModal
          isOpen={isOpen}
          onClose={onClose}
          variant={variant}
          isPending={false}
          onSubmitVariant={onUpdate}
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
          onConfirm={() => onDelete(articleId!, variant.id)}
          requireConfirmation
          isConfirmEnabled
          isLoading={false}
        >
          Czy na pewno chcesz usunąć wersję <b>{variant.variantName}</b>?
          <br />
          Ta operacja jest nieodwracalna.
        </ConfirmDialog>
      );

    case "reorder":
      return (
        <ManageResponseVariantsOrderModal open={isOpen} onClose={onClose} />
      );
  }
}
