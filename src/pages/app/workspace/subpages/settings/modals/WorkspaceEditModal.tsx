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

export const WorkspaceEditModal = ({
  type,
  isOpen,
  onClose,
  workspace,
}: Props) => {
  if (!type) return null;
  console.log("W", workspace);
  switch (type) {
    case "name":
      return (
        <EditWorkspaceNameModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
        />
      );

    case "description":
      return (
        <EditWorkspaceDescriptionModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
        />
      );

    case "labelColor":
      return (
        <EditWorkspaceLabelColorModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
        />
      );

    case "iconKey":
      return (
        <EditWorkspaceIconModal
          isOpen={isOpen}
          onClose={onClose}
          workspace={workspace}
        />
      );
  }
};
