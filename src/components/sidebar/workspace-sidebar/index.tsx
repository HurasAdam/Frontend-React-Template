import {
  articles,
  currentUser,
  labelColors,
  type Folder,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  FolderOpen,
  FolderPlus,
  MoreHorizontal,
  Pencil,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { workspaceIconMap } from "../../../constants/workspace-icons";

type SidebarProps = {
  onClose: () => void;
  isMobileOpen: boolean;
  workspace: unknown;
};

export function Sidebar({
  onClose,
  isMobileOpen,
  workspace,
  folders,
}: SidebarProps) {
  const [folderMenu, setFolderMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  console.log(workspace);

  const WorkspaceIcon = workspaceIconMap[workspace.iconKey] ?? BookOpen;

  const { id: workspaceId, folderId } = useParams<{
    id: string;
    folderId?: string;
  }>();

  const activeFolderId = folderId ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setFolderMenu(null);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const recentArticles = articles.slice(0, 3);

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}

        <div className="shrink-0 border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
              style={{ backgroundColor: workspace.labelColor }}
            >
              <WorkspaceIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {workspace.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">kolekcja</p>
            </div>

            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Recent articles */}
        <div className="shrink-0 border-b border-border px-4 py-4">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Ostatnio aktualizowane
          </p>

          {/* Quick management */}
          <div className="shrink-0 border-t border-border p-3">
            <div className="grid grid-cols-3 gap-1.5">
              <QuickBtn
                icon={Users}
                label="Członkowie"
                onClick={() => navigateTo(`/workspace/${workspaceId}/members`)}
              />

              <QuickBtn
                icon={Settings}
                label="Ustawienia"
                onClick={() => navigateTo(`/workspace/${workspaceId}/settings`)}
              />

              <QuickBtn
                icon={FolderPlus}
                label="Foldery"
                onClick={() => navigateTo(`/workspace/${workspaceId}/folders`)}
              />
            </div>
          </div>
        </div>

        {/* Folders */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-2">
          <div className="mb-1.5 flex items-center justify-between px-2 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Foldery
            </p>

            <button
              onClick={() => navigateTo(`/workspace/${workspaceId}/folders`)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Zarządzaj folderami"
            >
              <FolderPlus className="h-3.5 w-3.5" />
            </button>
          </div>

          <ul className="space-y-0.5">
            {folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                active={activeFolderId === folder.id}
                onSelect={() =>
                  navigateTo(`/workspace/${workspaceId}/folders/${folder.id}`)
                }
                onMenuToggle={(e) => {
                  e.stopPropagation();

                  setFolderMenu(folderMenu === folder.id ? null : folder.id);
                }}
                menuOpen={folderMenu === folder.id}
                menuRef={menuRef}
                onEdit={() => setFolderMenu(null)}
                onDelete={() => setFolderMenu(null)}
              />
            ))}

            {folders.length === 0 && (
              <li className="px-2 py-4 text-center text-xs text-muted-foreground">
                Brak folderów
              </li>
            )}
          </ul>
        </nav>

        {/* Quick management */}
        <div className="shrink-0 border-t border-border p-3">
          <div className="grid grid-cols-3 gap-1.5">
            <QuickBtn
              icon={Users}
              label="Członkowie"
              onClick={() => navigateTo(`/workspace/${workspaceId}/members`)}
            />

            <QuickBtn
              icon={Settings}
              label="Ustawienia"
              onClick={() => navigateTo(`/workspace/${workspaceId}/settings`)}
            />

            <QuickBtn
              icon={FolderPlus}
              label="Foldery"
              onClick={() => navigateTo(`/workspace/${workspaceId}/folders`)}
            />
          </div>
        </div>

        {/* User + back */}
        <div className="shrink-0 border-t border-border p-3">
          <button
            onClick={() => navigateTo("/articles")}
            className="mb-2 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Powrót do bazy wiedzy
          </button>

          <div className="flex items-center gap-3 rounded-lg bg-accent/50 p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {currentUser.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {currentUser.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {currentUser.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function QuickBtn({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col bg-background items-center justify-center border border-border gap-1 rounded-md px-2 py-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

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
  folder: Folder;
  active: boolean;
  onSelect: () => void;
  onMenuToggle: (e: React.MouseEvent) => void;
  menuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const color = labelColors[folder.color] ?? labelColors.blue;

  return (
    <div className="relative">
      <button
        onClick={onSelect}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md",
            color.bg,
          )}
        >
          <FolderOpen className={cn("h-3.5 w-3.5", color.text)} />
        </div>

        <span className="min-w-0 flex-1 truncate text-left">{folder.name}</span>

        <span className="shrink-0 text-xs text-muted-foreground">
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
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </span>
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-full z-50 mt-1 w-36 rounded-md border border-border bg-card p-1 shadow-md"
        >
          <button
            type="button"
            onClick={onEdit}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
            Zmień nazwę
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Usuń
          </button>
        </div>
      )}
    </div>
  );
}
