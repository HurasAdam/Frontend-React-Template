import { useState } from "react";

export type IProductInfo = {
  id: string;
  name: string;
};

type ProductTopicModalState =
  | { mode: "CREATE"; product: IProductInfo }
  | { mode: "EDIT"; product: IProductInfo; topicId: string };

export const useProductTopicModal = () => {
  const [state, setState] = useState<ProductTopicModalState | null>(null);

  const openAddProductTopic = (product: IProductInfo) =>
    setState({
      mode: "CREATE",
      product,
    });

  const openEditProductTopic = (product: IProductInfo, topicId: string) =>
    setState({
      mode: "EDIT",
      product,
      topicId,
    });

  const close = () => setState(null);

  return {
    state,

    isOpen: state !== null,
    isCreate: state?.mode === "CREATE",
    isEdit: state?.mode === "EDIT",

    topicId: state?.mode === "EDIT" ? state.topicId : null,

    product:
      state?.mode === "CREATE" || state?.mode === "EDIT" ? state.product : null,

    openAddProductTopic,
    openEditProductTopic,
    close,
  };
};
