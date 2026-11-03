/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { toast } from "sonner";
import { useUpdateArticleTitle } from "../../../../hooks/articles/actions/update-title";
import type { EditArticleModalType } from "../hooks/useEditArticleModal";
import { EditArticleInternalNoteModal } from "../modals/EditArticleInternalNoteModal";
import { UpdateArticleProductCategoryModal } from "../modals/EditArticleProductCategoryModal";
import { EditArticleTagsModal } from "../modals/EditArticleTagsModal";

import { useUpdateArticleInternalNote } from "../../../../hooks/articles/actions/update-internalNote";
import { useUpdateArticleProductAndCategory } from "../../../../hooks/articles/actions/update-productAndCategory";
import { useUpdateArticleTags } from "../../../../hooks/articles/actions/update-tags";
import { EditArticleTitleModal } from "../modals/EditArticleTitleModal";

type Article = {
  id: string;
  title: string;
  internalNote: string | null;
  product: {
    id: string;
    name: string;
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
};

type Props = {
  type: EditArticleModalType;
  article: Article;
  isPending: boolean;
  onClose: () => void;
  onSaveTitle: (data: { title: string }) => Promise<void>;
};

export const EditArticleModalsSection = ({
  type,
  article,
  isPending,
  onClose,
  onSaveTitle,
}: Props) => {
  const { updateArticleTitle, isArticleTitlteUpdatePending } =
    useUpdateArticleTitle();

  const { updateArticleInternalNote, isArticleInternalNoteUpdatePending } =
    useUpdateArticleInternalNote();

  const {
    updateArticleProductAndCategory,
    isArticleProductAndCategoryUpdatePending,
  } = useUpdateArticleProductAndCategory();

  const { updateArticleTags, isArticleTagsUpdatePending } =
    useUpdateArticleTags();

  const onUpdateTitle = async (payload) => {
    try {
      await updateArticleTitle(article.id, payload);
      onClose();
      toast.success("Tytuł artykułu został zaktualizowany");
      return;
    } catch (error) {
      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onUpdateInternalNote = async (payload) => {
    try {
      await updateArticleInternalNote(article.id, payload);
      onClose();
      toast.success("Notatka dla pracownika została zaktualizowana");
      return;
    } catch (error) {
      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onUpdateProductAndCategory = async (payload) => {
    try {
      await updateArticleProductAndCategory(article.id, payload);
      onClose();
      toast.success("Notatka dla pracownika została zaktualizowana");
      return;
    } catch (error) {
      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  const onUpdateTags = async (payload) => {
    try {
      await updateArticleTags(article.id, payload);
      onClose();
      toast.success("Lista przypisanych tagów została zakutalizowana");
      return;
    } catch (error) {
      toast.error("Wystapił błąd");
      onClose();
      return;
    }
  };

  if (!type) return null;

  switch (type) {
    case "title":
      return (
        <EditArticleTitleModal
          open
          title={article.title}
          isPending={isArticleTitlteUpdatePending}
          onClose={onClose}
          onSave={onUpdateTitle}
        />
      );

    case "internalNote":
      return (
        <EditArticleInternalNoteModal
          open
          note={article.internalNote ?? ""}
          isPending={isArticleInternalNoteUpdatePending}
          onClose={onClose}
          onSave={onUpdateInternalNote}
        />
      );

    case "productCategory":
      if (!article.product || !article.category) return null;

      return (
        <UpdateArticleProductCategoryModal
          key={`${article.id}-${article.product.id}-${article.category.id}`}
          open
          currentProductId={article.product.id}
          currentCategoryId={article.category.id}
          isPending={isPending}
          onClose={onClose}
          onSubmit={onUpdateProductAndCategory}
        />
      );
    case "tags":
      return (
        <EditArticleTagsModal
          key={`${article.id}-${article.tags.map((tag) => tag.id).join("-")}`}
          open
          articleId={article.id}
          tags={article.tags}
          isPending={isPending}
          onClose={onClose}
          onSubmit={onUpdateTags}
        />
      );

    default:
      return null;
  }
};
