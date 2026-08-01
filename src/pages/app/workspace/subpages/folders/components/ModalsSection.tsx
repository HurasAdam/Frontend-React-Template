import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../../../components/shared/ConfirmDialog";
import { useAddWorkspaceFolder } from "../../../../../../hooks/workspace-folders/actions/add";
import { useDeleteWorkspaceFolder } from "../../../../../../hooks/workspace-folders/actions/delete";
import { useUpdateWorkspaceFolder } from "../../../../../../hooks/workspace-folders/actions/update";
import type { IFolderFormData } from "../../../../../../hooks/workspace-folders/mutations/types/workspace-folders.mutation.types";
import type { FolderModalType, IFolderInfo } from "../hooks/useFolderModal";
import { AddWorkspaceFolderModal } from "../modals/AddWorkspaceFolderModal";
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
  const { id: workspaceId } = useParams<{ id: string }>();
  const { addFolder, isAddPending } = useAddWorkspaceFolder();
  const { updateFolder, isUpdatePending } = useUpdateWorkspaceFolder();
  const { deleteFolder, isPending: isDeletePending } =
    useDeleteWorkspaceFolder();

  const onAdd = async (data: IFolderFormData) => {
    if (!workspaceId) {
      throw new Error("Workspace ID is missing");
    }
    await addFolder(workspaceId, data);
    onClose();
    toast.success("Dodano nowy folder");
  };

  const onEdit = async (data: IFolderFormData) => {
    if (!folder || !workspaceId) {
      throw new Error("Missing required data");
    }
    await updateFolder(folder.id, workspaceId, data);
    onClose();
    toast.success("Folder został zaktualizowany");
  };

  const onDelete = async () => {
    if (!folder || !workspaceId) {
      throw new Error("Missing required data");
    }
    try {
      await deleteFolder(folder.id, workspaceId);

      onClose();
      toast.success("Folder został usunięty");
    } catch {
      toast.error("Nie udało się usunąć folderu");
    }
  };

  if (!type) return;

  switch (type) {
    case "add":
      return (
        <AddWorkspaceFolderModal
          isOpen={isOpen}
          isPending={isAddPending}
          onClose={onClose}
          onSave={onAdd}
        />
      );

    case "edit":
      if (!folder) return null;
      return (
        <EditWorkspaceFolderModal
          isOpen={isOpen}
          isPending={isUpdatePending}
          onClose={onClose}
          onSave={onEdit}
          folder={folder}
        />
      );

    case "delete":
      if (!folder) return null;

      return (
        <ConfirmDialog
          isOpen={isOpen}
          title="Usunąć folder?"
          type="warning"
          onCancel={onClose}
          onConfirm={onDelete}
          requireConfirmation
          isConfirmEnabled
          isLoading={isDeletePending}
        >
          Czy na pewno chcesz usunąć folder <b>{folder.name}</b>?
          <br />
          Ta operacja jest nieodwracalna.
        </ConfirmDialog>
      );
  }
}
