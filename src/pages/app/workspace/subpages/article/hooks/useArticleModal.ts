import { useState } from "react";

export type ArticleModalType = "edit" | "delete" | null;

export type IArticleModalInfo = {
  id: string;
  title: string;
  folderId: string;
};

export const useArticleModal = () => {
  const [type, setType] = useState<ArticleModalType>(null);

  const [article, setArticle] = useState<IArticleModalInfo | null>(null);

  const openEdit = (article: IArticleModalInfo) => {
    setArticle(article);
    setType("edit");
  };

  const openDelete = (article: IArticleModalInfo) => {
    setArticle(article);
    setType("delete");
  };

  const close = () => {
    setArticle(null);
    setType(null);
  };

  return {
    type,
    article,
    isOpen: type !== null,

    openEdit,
    openDelete,
    close,
  };
};
