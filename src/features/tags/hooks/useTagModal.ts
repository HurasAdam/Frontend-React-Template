import { useState } from "react";

export type ITag = {
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
  | { mode: "EDIT"; tagId: string }
  | { mode: "INFO"; tag: ITag };

export const useTagModal = () => {
  const [state, setState] = useState<TagModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });

  const openEdit = (id: string) => setState({ mode: "EDIT", tagId: id });

  const openInfo = (tag: ITag) => setState({ mode: "INFO", tag });

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,

    isCreate: state?.mode === "CREATE",
    isEdit: state?.mode === "EDIT",
    isInfo: state?.mode === "INFO",

    tag: state?.mode === "INFO" ? state.tag : null,
    tagId: state?.mode === "EDIT" ? state.tagId : null,

    openAdd,
    openEdit,
    openInfo,
    close,
  };
};
