import { useState } from "react";

export type EditModalType =
  | "name"
  | "description"
  | "labelColor"
  | "iconKey"
  | null;

export const useEditModal = () => {
  const [type, setType] = useState<EditModalType>(null);

  const open = (modal: Exclude<EditModalType, null>) => {
    setType(modal);
  };

  const close = () => {
    setType(null);
  };

  return {
    type,
    isOpen: type !== null,
    open,
    close,
  };
};
