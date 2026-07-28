import { SettingsIcon } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { ConfirmDialog } from "../../../../../../components/shared/ConfirmDialog";
import { useConfirmDialog } from "../../../../../../components/shared/hooks/useConfirmDialog";
import BasicSettings from "../components/BasicSettings";
import DangerZone from "../components/DangerZone";
import Header from "../components/Header";
import { useEditModal } from "../hooks/useEditModal";
import { WorkspaceEditModal } from "../modals/WorkspaceEditModal";

export interface IWorkspaceInfo {
  id: string;
  name: string;
  description: string;
  labelColor: string;
  iconKey: string;
}

type WorkspaceContext = {
  workspace: IWorkspaceInfo;
};

export const Settings = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();

  const editModal = useEditModal();
  const deleteModal = useConfirmDialog();

  const onDelete = (workspace: IWorkspaceInfo) => {
    deleteModal.open({
      title: "Czy jesteś pewien?",
      type: "warning",
      description: (
        <>
          <p className="mb-3">
            Czy na pewno chcesz usunąć kolekcję <b>{workspace.name}</b>?
          </p>

          <p className="text-sm text-muted-foreground">
            Po zatwierdzeniu kolekcja oraz wszystkie powiązane z nią dane
            zostaną trwale usunięte. Tej operacji nie można cofnąć.
          </p>
        </>
      ),
      data: workspace,
      onConfirm: (workspace) => () => {
        console.log(workspace);
      },
    });
  };

  return (
    <div>
      <Header
        title="Ustawienia kolekcji"
        description="Zarządzaj nazwą, wyglądem oraz informacjami kolekcji"
        icon={SettingsIcon}
      />

      <BasicSettings workspace={workspace} onEdit={editModal.open} />

      <DangerZone workspace={workspace} onDelete={onDelete} />

      <WorkspaceEditModal
        type={editModal.type}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        workspace={workspace}
      />

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        type={deleteModal.type}
        onCancel={deleteModal.close}
        onConfirm={deleteModal.confirm}
        isLoading={false}
        requireConfirmation={true}
        isConfirmEnabled={true}
      >
        {deleteModal.description}
      </ConfirmDialog>
    </div>
  );
};
