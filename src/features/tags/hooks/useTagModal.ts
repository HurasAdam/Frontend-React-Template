import { useState } from "react";

type TagModalState = {
  mode: "CREATE" | "EDIT";
  tagId?: string;
};

export const useTagModal = () => {
  const [state, setState] = useState<TagModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });
  const openEdit = (id: string) => setState({ mode: "EDIT", tagId: id });
  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,
    isEdit: state?.mode === "EDIT",
    productId: state?.tagId,
    openAdd,
    openEdit,
    close,
  };
};
