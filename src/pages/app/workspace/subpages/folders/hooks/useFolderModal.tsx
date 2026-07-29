import { useState } from "react";

export type FolderModalType = "add" | "edit" | null;

export type IFolderInfo = {
  id: string;
  name: string;
  description: string;
};

export const useFolderModal = () => {
  const [type, setType] = useState<FolderModalType>(null);
  const [folder, setFolder] = useState<IFolderInfo | null>(null);

  const openAdd = () => {
    setFolder(null);
    setType("add");
  };

  const openEdit = (folder: IFolderInfo) => {
    setFolder(folder);
    setType("edit");
  };

  const close = () => {
    setFolder(null);
    setType(null);
  };

  return {
    type,
    folder,
    isOpen: type !== null,
    openAdd,
    openEdit,
    close,
  };
};
