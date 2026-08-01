import { Folders as FoldersIcon, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";
import { useFindAllFoldersByWorkspaceQuery } from "../../../../../../hooks/workspace-folders/queries/use-workspace-folders.queries";
import PageHeader from "../../settings/components/PageHeader";
import FolderListSection from "../components/FolderListSection";
import ModalsSection from "../components/ModalsSection";
import { useFolderModal } from "../hooks/useFolderModal";

export function Folders() {
  const folderModal = useFolderModal();
  const { id: workspaceId } = useParams();
  const { data: folders = [] } = useFindAllFoldersByWorkspaceQuery(workspaceId);

  console.log("workspaceId:", workspaceId);
  return (
    <div>
      <PageHeader
        title="Ustawienia folderów"
        description="Zarządzaj folderami"
        icon={FoldersIcon}
        actions={
          <Button onClick={folderModal.openAdd}>
            <Plus className="h-4 w-4" />
            Dodaj folder
          </Button>
        }
      />
      <FolderListSection
        folders={folders}
        onDelete={folderModal.openDelete}
        onEdit={folderModal.openEdit}
      />
      <ModalsSection
        isOpen={folderModal.isOpen}
        type={folderModal.type}
        onClose={folderModal.close}
        folder={folderModal.folder}
      />
    </div>
  );
}
