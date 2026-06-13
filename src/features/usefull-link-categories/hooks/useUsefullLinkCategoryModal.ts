import { useState } from "react";

export type ILinkCategory = {
  id: string;
  name: string;
  createdBy: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

type TagModalState =
  | { mode: "CREATE" }
  | { mode: "EDIT"; linkCategoryId: string }
  | { mode: "INFO"; tag: ILinkCategory };

export const useUsefullLinkCategoryModal = () => {
  const [state, setState] = useState<TagModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });

  const openEdit = (id: string) =>
    setState({ mode: "EDIT", linkCategoryId: id });

  const openInfo = (tag: ILinkCategory) => setState({ mode: "INFO", tag });

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,

    isCreate: state?.mode === "CREATE",
    isEdit: state?.mode === "EDIT",
    isInfo: state?.mode === "INFO",

    tag: state?.mode === "INFO" ? state.tag : null,
    linkCategoryId: state?.mode === "EDIT" ? state.linkCategoryId : null,

    openAdd,
    openEdit,
    openInfo,
    close,
  };
};
