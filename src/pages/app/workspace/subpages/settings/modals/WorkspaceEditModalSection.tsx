import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useUpdateWorkspace } from "../../../../../../hooks/workspaces/actions/update";
import type { EditModalType } from "../hooks/useEditModal";
import type { IWorkspaceInfo } from "../view/Settings";
import { EditWorkspaceDescriptionModal } from "./EditWorkspaceDescriptionModal";
import { EditWorkspaceIconModal } from "./EditWorkspaceIconModal";
import { EditWorkspaceLabelColorModal } from "./EditWorkspaceLabelColorModal";
import { EditWorkspaceNameModal } from "./EditWorkspaceNameModal";

interface Props {
  type: EditModalType;
  isOpen: boolean;
  onClose: () => void;
  workspace: IWorkspaceInfo;
}

export type UpdateWorkspaceData = Partial<
  Pick<IWorkspaceInfo, "name" | "description" | "iconKey" | "labelColor">
>;

export const WorkspaceEditModalSection = ({
  type,
  isOpen,
  onClose,
  workspace,
}: Props) => {
  const { updateWorkspace, isUpdatePending } = useUpdateWorkspace();

  const onSave = async (data: UpdateWorkspaceData) => {
    try {
      await updateWorkspace(workspace.id, data);
      toast.success("Dane kolekcji zostały zaktualizowane");
      onClose();
      return;
    } catch (error) {
      const { status } = error as AxiosError;
      if (status === 403) {
        toast.error("Brak uprawnień", {
          description: "Nie masz uprawnien do edycji tej kolekcji",
        });
        onClose();
        return;
      }
      toast.error("Wystpaił błąd");
      onClose();
      return;
    }
  };

  if (!type) return null;

  switch (type) {
    case "name":
      return (
        <EditWorkspaceNameModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
          onSave={onSave}
        />
      );

    case "description":
      return (
        <EditWorkspaceDescriptionModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
          onSave={onSave}
        />
      );

    case "labelColor":
      return (
        <EditWorkspaceLabelColorModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
          onSave={onSave}
        />
      );

    case "iconKey":
      return (
        <EditWorkspaceIconModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
          onSave={onSave}
        />
      );
  }
};
