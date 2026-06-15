import { useState } from "react";

export type ILink = {
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
  | { mode: "EDIT"; linkId: string }
  | { mode: "INFO"; link: ILink };

export const useUsefullLinkModal = () => {
  const [state, setState] = useState<TagModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });

  const openEdit = (id: string) => setState({ mode: "EDIT", linkId: id });

  const openInfo = (link: ILink) => setState({ mode: "INFO", link });

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,

    isCreate: state?.mode === "CREATE",
    isEdit: state?.mode === "EDIT",
    isInfo: state?.mode === "INFO",

    link: state?.mode === "INFO" ? state.link : null,
    linkCategoryId: state?.mode === "EDIT" ? state.linkId : null,

    openAdd,
    openEdit,
    openInfo,
    close,
  };
};
