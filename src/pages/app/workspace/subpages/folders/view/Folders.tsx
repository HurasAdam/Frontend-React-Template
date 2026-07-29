import { Folders as FoldersIcon, Plus } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import PageHeader from "../../settings/components/PageHeader";
import ModalsSection from "../components/ModalsSection";
import { useFolderModal } from "../hooks/useFolderModal";

export function Folders() {
  const folderModal = useFolderModal();
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

      <ModalsSection
        isOpen={folderModal.isOpen}
        type={folderModal.type}
        onClose={folderModal.close}
        folder={folderModal.folder}
      />
    </div>
  );
}
