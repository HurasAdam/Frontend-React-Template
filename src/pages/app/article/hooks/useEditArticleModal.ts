import { useState } from "react";

export type EditArticleModalType =
  | "title"
  | "internalNote"
  | "productCategory"
  | "tags"
  | "responseVariant"
  | "responseVariantOrder"
  | null;

export const useEditArticleModal = () => {
  const [type, setType] = useState<EditArticleModalType>(null);
  const [variantId, setVariantId] = useState<string | null>(null);

  const openTitle = () => setType("title");
  const openInternalNote = () => setType("internalNote");
  const openProductCategory = () => setType("productCategory");
  const openTags = () => setType("tags");

  const openResponseVariant = (id?: string) => {
    setVariantId(id ?? null);
    setType("responseVariant");
  };

  const openResponseVariantOrder = () => {
    setType("responseVariantOrder");
  };

  const close = () => {
    setType(null);
    setVariantId(null);
  };

  return {
    type,
    variantId,
    isOpen: type !== null,
    openTitle,
    openInternalNote,
    openProductCategory,
    openTags,
    openResponseVariant,
    openResponseVariantOrder,
    close,
  };
};
