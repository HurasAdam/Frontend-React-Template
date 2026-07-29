import type { FolderModalType, IFolderInfo } from "../hooks/useFolderModal";
import {
  AddWorkspaceFolderModal,
  type WorkspaceFolderFormData,
} from "../modals/AddWorkspaceFolderModal";
import { EditWorkspaceFolderModal } from "../modals/EditWorkspaceFolderModal";

interface Props {
  type: FolderModalType;
  isOpen: boolean;
  onClose: () => void;
  folder: IFolderInfo | null;
}

export default function ModalsSection({
  type,
  isOpen,
  onClose,
  folder,
}: Props) {
  function onSave(data: WorkspaceFolderFormData): void {
    // TODO
  }

  if (!type) return;

  switch (type) {
    case "add":
      return (
        <AddWorkspaceFolderModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
        />
      );

    case "edit":
      if (!folder) return null;
      return (
        <EditWorkspaceFolderModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          folder={folder}
        />
      );
  }
}
