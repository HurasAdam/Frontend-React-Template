import { useState } from "react";

export type IProductInfo = {
  id: string;
  name: string;
};

type ProductCategoryModalState =
  | { mode: "CREATE"; product: IProductInfo }
  | { mode: "EDIT"; product: IProductInfo; categoryId: string }
  | { mode: "INFO"; tagId: string };

export const useProductCategoryModal = () => {
  const [state, setState] = useState<ProductCategoryModalState | null>(null);

  const openAddProductCategory = (product: IProductInfo) =>
    setState({ mode: "CREATE", product });

  const openEditProductCategory = (product: IProductInfo, categoryId: string) =>
    setState({
      mode: "EDIT",
      product,
      categoryId,
    });

  //   const openInfo = (tag: ITag) => setState({ mode: "INFO", tag });

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,

    isCreate: state?.mode === "CREATE",
    isEdit: state?.mode === "EDIT",
    isInfo: state?.mode === "INFO",

    // tag: state?.mode === "INFO" ? state.tag : null,
    categoryId: state?.mode === "EDIT" ? state.categoryId : null,
    product:
      state?.mode === "CREATE" || state?.mode === "EDIT" ? state.product : null,

    openAddProductCategory,
    openEditProductCategory,
    // openInfo,
    close,
  };
};
