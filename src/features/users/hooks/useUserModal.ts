import { useState } from "react";

type UserModalState = {
  mode: "CREATE" | "EDIT";
  userId?: string;
};

export const useUserModal = () => {
  const [state, setState] = useState<UserModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });
  const openEdit = (id: string) => setState({ mode: "EDIT", userId: id });

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,
    isEdit: state?.mode === "EDIT",
    userId: state?.userId,
    openAdd,
    openEdit,
    close,
  };
};
