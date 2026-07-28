import queryClient from "../../../../../../config/query.config";
import { useUpdateWorkspaceMutation } from "../../../../../../hooks/workspaces/mutations/use-workspace.mutations";
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

export const WorkspaceEditModal = ({
  type,
  isOpen,
  onClose,
  workspace,
}: Props) => {
  const { mutateAsync: updateWorkspace } = useUpdateWorkspaceMutation();

  const onSave = (data: UpdateWorkspaceData) => {
    return updateWorkspace(
      { workspaceId: workspace.id, payload: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["workspace", workspace.id],
          });
        },
      },
    );
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
