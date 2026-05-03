import { useState } from "react";

type ProductModalState = {
  mode: "CREATE" | "EDIT";
  productId?: string;
};

export const useProductModal = () => {
  const [state, setState] = useState<ProductModalState | null>(null);

  const openAdd = () => setState({ mode: "CREATE" });
  const openEdit = (id: string) => setState({ mode: "EDIT", productId: id });
  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,
    isEdit: state?.mode === "EDIT",
    productId: state?.productId,
    openAdd,
    openEdit,
    close,
  };
};
