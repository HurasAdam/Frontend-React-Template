import { useState } from "react";

export type ArticleVariantModalType =
  | "add"
  | "edit"
  | "delete"
  | "reorder"
  | null;

export type IArticleVariantInfo = {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
};

export const useArticleResponseVariantModal = () => {
  const [type, setType] = useState<ArticleVariantModalType>(null);

  const [variant, setVariant] = useState<IArticleVariantInfo | null>(null);

  const openAdd = () => {
    setVariant(null);
    setType("add");
  };

  const openEdit = (variant: IArticleVariantInfo) => {
    setVariant(variant);
    setType("edit");
  };

  const openDelete = (variant: IArticleVariantInfo) => {
    setVariant(variant);
    setType("delete");
  };

  const openReorder = () => {
    setVariant(null);
    setType("reorder");
  };

  const close = () => {
    setVariant(null);
    setType(null);
  };

  return {
    type,
    variant,
    isOpen: type !== null,

    openAdd,
    openEdit,
    openDelete,
    openReorder,
    close,
  };
};
