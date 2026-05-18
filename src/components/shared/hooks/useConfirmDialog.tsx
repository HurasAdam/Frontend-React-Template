import { useState } from "react";

type ConfirmState<T = any> = {
  isOpen: boolean;
  title: string;
  type: "info" | "warning" | "success" | "default";
  description?: React.ReactNode;
  data: T | null;
  onConfirm: (() => void) | null;
};

export const useConfirmDialog = () => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    type: "",
    description: null,
    data: null,
    onConfirm: null,
  });

  const open = <T,>(params: {
    title: string;
    description?: React.ReactNode;
    type: "info" | "warning" | "success" | "default";
    data: T;
    onConfirm: (data: T) => void;
  }) => {
    setState({
      isOpen: true,
      type: params.type,
      title: params.title,
      description: params.description,
      data: params.data,
      onConfirm: () => params.onConfirm(params.data),
    });
  };

  const close = () => {
    setState((s) => ({
      ...s,
      isOpen: false,
    }));
  };

  const confirm = () => {
    state.onConfirm?.();
  };

  return {
    ...state,
    open,
    close,
    confirm,
  };
};
