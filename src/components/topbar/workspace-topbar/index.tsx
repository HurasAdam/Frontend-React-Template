import { articles, folders } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronRight,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type View =
  | { kind: "articles"; folderId: string }
  | { kind: "dashboard" }
  | { kind: "settings" }
  | { kind: "members" }
  | { kind: "folders" }
  | { kind: "article-detail"; articleId: string };

type TopBarProps = {
  view: View;
  onNewArticle: () => void;
  onOpenSettings: () => void;
  onOpenMembers: () => void;
  onOpenFolders: () => void;
  onBackToBase: () => void;
  onToggleMobileSidebar: () => void;
};

export function TopBar({
  workspace,
  view,
  onNewArticle,
  onOpenSettings,
  onOpenMembers,
  onOpenFolders,
  onBackToBase,
  onToggleMobileSidebar,
}: TopBarProps) {
  const activeFolder =
    view.kind === "articles"
      ? folders.find((f) => f.id === view.folderId)
      : null;

  const activeArticle =
    view.kind === "article-detail"
      ? articles.find((article) => article.id === view.articleId)
      : null;

  const viewLabel: Record<View["kind"], string> = {
    articles: activeFolder?.name ?? "Artykuły",
    dashboard: "Panel główny",
    settings: "Ustawienia",
    members: "Członkowie",
    folders: "Foldery",
    "article-detail": activeArticle?.title ?? "Artykuł",
  };

  const viewIcon: Record<
    View["kind"],
    React.ComponentType<{ className?: string }>
  > = {
    articles: FileText,
    dashboard: LayoutDashboard,
    settings: Settings,
    members: Users,
    folders: FolderOpen,
    "article-detail": FileText,
  };

  const ViewIcon = viewIcon[view.kind];

  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-8 lg:pl-[312px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={onToggleMobileSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <button
                onClick={onBackToBase}
                className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Wróć
              </button>
            </div>
          </div>
          <span className="font-medium text-foreground sm:hidden">
            {viewLabel[view.kind]}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* <button
            onClick={onBackToBase}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Baza wiedzy
          </button> */}
          <button
            onClick={() => navigate(`/workspace/${workspace.id}/new-article`)}
            className="hidden items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow sm:flex"
          >
            <Plus className="h-4 w-4" />
            Nowy artykuł
          </button>
          <button
            onClick={onNewArticle}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </button>

          <div className="mx-1 h-6 w-px bg-border" />

          <button
            onClick={onOpenMembers}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent",
              view.kind === "members"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            title="Członkowie kolekcji"
          >
            <Users className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenFolders}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent",
              view.kind === "folders"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            title="Zarządzaj folderami"
          >
            <FolderOpen className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenSettings}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent",
              view.kind === "settings"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            title="Ustawienia kolekcji"
          >
            <Settings className="h-4 w-4" />
          </button>

          <div className="mx-1 h-6 w-px bg-border" />

          <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
        </div>
      </div>
    </div>
  );
}
