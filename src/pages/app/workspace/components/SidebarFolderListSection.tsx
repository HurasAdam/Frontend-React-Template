import {
  Folder as FolderIcon,
  FolderOpen,
  FolderPlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  getFolderColorClasses,
  type FolderColor,
} from "../../../../constants/workspace-folder-colorsV2";

export interface WorkspaceFolder {
  id: string;
  name: string;
  description?: string;
  color: FolderColor;
  articleCount: number;
}

const MOCK_FOLDERS: WorkspaceFolder[] = [
  {
    id: "6a8b1618623155b427231eb8",
    name: "SMART DODATKI1",
    description:
      "Informacje i instrukcje dotyczące Planu SMART DODATKI w aplikacji Librus.",
    color: "teal",
    articleCount: 11,
  },
  {
    id: "6a8b1733623155b427231fbb",
    name: "aplikacja LIBRUS",
    description:
      "Szablony i materiały dotyczące działania aplikacji mobilnej dla rodziców i uczniów - LIBRUS",
    color: "blue",
    articleCount: 1,
  },
  {
    id: "6a8dd537f2dd1836b542461f",
    name: "procedury",
    description: "",
    color: "rose",
    articleCount: 4,
  },
];

interface Props {
  folders?: WorkspaceFolder[];
  activeFolderId?: string | null;
  onSelectFolder?: (id: string) => void;
  onManageFolders?: () => void;
}

export const WorkspaceFolderList = ({
  folders = MOCK_FOLDERS,
  activeFolderId,
  onSelectFolder,
  onManageFolders,
}: Props) => {
  const [selected, setSelected] = useState<string | null>(
    activeFolderId ?? folders[0]?.id ?? null,
  );
  const [folderMenu, setFolderMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setFolderMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-full flex-col  bg-sidebar px-3 py-4">
      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Foldery
          </span>
          <span className="rounded-full bg-accent px-1.5 py-px text-[10px] font-medium tabular-nums text-muted-foreground">
            {folders.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onManageFolders}
          title="Zarządzaj folderami"
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <FolderPlus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* LIST */}
      <div className="-mr-1 flex-1 space-y-0.5 overflow-y-auto pr-1">
        {folders.map((folder) => (
          <FolderRow
            key={folder.id}
            folder={folder}
            active={selected === folder.id}
            onSelect={() => {
              setSelected(folder.id);
              onSelectFolder?.(folder.id);
            }}
            menuOpen={folderMenu === folder.id}
            menuRef={menuRef}
            onMenuToggle={(e) => {
              e.stopPropagation();
              setFolderMenu(folderMenu === folder.id ? null : folder.id);
            }}
            onEdit={() => setFolderMenu(null)}
            onDelete={() => setFolderMenu(null)}
          />
        ))}

        {folders.length === 0 && (
          <p className="px-2.5 py-6 text-center text-xs text-muted-foreground">
            Brak folderów
          </p>
        )}
      </div>
    </div>
  );
};

function FolderRow({
  folder,
  active,
  onSelect,
  onMenuToggle,
  menuOpen,
  menuRef,
  onEdit,
  onDelete,
}: {
  folder: WorkspaceFolder;
  active: boolean;
  onSelect: () => void;
  onMenuToggle: (e: React.MouseEvent) => void;
  menuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const color = getFolderColorClasses(folder.color);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onSelect}
        title={folder.description || folder.name}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left",
          "transition-all duration-200 ease-out",
          active
            ? cn(color.softClass, "shadow-sm ring-1", color.ringClass)
            : "hover:bg-accent/60",
        )}
      >
        {/* aktywny rail */}
        <span
          className={cn(
            "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full transition-all duration-200",
            color.accentClass,
            active ? "opacity-100" : "scale-y-0 opacity-0",
          )}
        />

        {/* kafelek ikony w kolorze folderu */}
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
            color.softClass,
            color.textClass,
            active ? "opacity-100" : "opacity-75 group-hover:opacity-100",
          )}
        >
          {active ? (
            <FolderOpen className="size-4" />
          ) : (
            <FolderIcon className="size-4" />
          )}
        </span>

        <span
          className={cn(
            "min-w-0 flex-1 truncate text-[13px] leading-5",
            active ? "font-medium text-foreground" : "text-foreground/75",
          )}
        >
          {folder.name}
        </span>

        <span
          className={cn(
            "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums transition-all",
            active
              ? cn(color.softClass, color.textClass)
              : "text-muted-foreground group-hover:opacity-0",
          )}
        >
          {folder.articleCount}
        </span>

        <span
          role="button"
          tabIndex={0}
          onClick={onMenuToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onMenuToggle(e as unknown as React.MouseEvent);
            }
          }}
          className={cn(
            "absolute right-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
            "text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground",
            "group-hover:opacity-100",
            menuOpen && "opacity-100",
          )}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </span>
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-9 z-20 w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg"
        >
          <button
            type="button"
            onClick={onEdit}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-popover-foreground transition-colors hover:bg-accent"
          >
            <Pencil className="h-3.5 w-3.5" />
            Zmień nazwę
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Usuń
          </button>
        </div>
      )}
    </div>
  );
}
