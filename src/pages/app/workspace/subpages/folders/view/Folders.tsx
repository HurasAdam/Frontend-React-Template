import { FolderCog, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFindAllFoldersByWorkspaceQuery } from "../../../../../../hooks/workspace-folders/queries/use-workspace-folders.queries";
import PageHeader from "../../settings/components/PageHeader";
import FolderListSection from "../components/FolderListSection";
import type { IFolderInfo } from "../hooks/useFolderModal";

type Props = {
  folderModal: {
    openDelete: (folder: IFolderInfo) => void;
    openEdit: (folder: IFolderInfo) => void;
    openAdd: () => void;
  };
};

export function Folders({ folderModal }: Props) {
  const { id: workspaceId } = useParams();
  const [search, setSearch] = useState("");

  const { data: folders = [] } = useFindAllFoldersByWorkspaceQuery(workspaceId);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <PageHeader
        title="Zarządzaj folderami"
        description="Twórz, edytuj i organizuj foldery"
        icon={FolderCog}
        actions={
          <button
            type="button"
            onClick={folderModal.openAdd}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Plus className="size-4" />
            <span>Dodaj folder</span>
          </button>
        }
      />
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Szukaj folderów..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>
      <FolderListSection
        folders={filteredFolders}
        onAdd={folderModal.openAdd}
        onDelete={folderModal.openDelete}
        onEdit={folderModal.openEdit}
      />
    </div>
  );
}
