import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  ChevronDown,
  FolderClosed,
  FolderOpen,
  Lock,
  Plus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  workspaceIconMap,
  workspaceIconOptions,
} from "../../../../constants/workspace-icons";
import { cn } from "../../../../lib/utils";
import { WorkspaceSidebarNavLinks } from "./WorkspaceSidebarNavLinks";

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  description: string;
  labelColor: string;
  owner: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceSidebarProps {
  workspace: Workspace;
  workspaces: Workspace[];
  isLoading: boolean;
  workspaceId: string;
  folders: {
    id: string;
    workspaceId: string;
    name: string;
    createdBy: string;
    updatedBy: string;
    articlesCount: number;
    permissions?: Record<string, boolean>;
  }[];
  permissions?: Record<string, boolean>;
  onAddFolder: () => void;
  onOpenNewArticle: () => void;
  onCreateWorkspace: () => void;
}

export const WorkspaceSidebar = ({
  workspace,
  folders,
  workspaces,
  permissions,
  onAddFolder,
  onOpenNewArticle,
}: WorkspaceSidebarProps) => {
  const navigate = useNavigate();

  const IconComponent = workspace ? workspaceIconMap[workspace.iconKey] : null;
  console.log("PERMITY", permissions);
  return (
    <div className="h-full bg-sidebar flex flex-col border-r ">
      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full focus:outline-none focus:ring-0  ">
            {/* LEFT ICON */}
            <div className="w-16 flex items-center justify-center bg-card/95 border-r">
              {IconComponent && (
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
                  style={{
                    background: `${workspace?.labelColor || "#6b7280"}20`,
                  }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: workspace?.labelColor }}
                  />
                </div>
              )}
            </div>

            {/* RIGHT CARD */}
            <div className="w-full pt-2.5 pb-2.5 px-3 flex-1 flex items-center justify-between ">
              <div
                style={{
                  backgroundColor: workspace?.labelColor
                    ? `${workspace.labelColor}35`
                    : undefined,
                }}
                className="
          flex-1 flex items-center justify-between
          px-3 pt-1.5 pb-1.5
          rounded-xl
          bg-card/70
          border border-l-0
          hover:bg-muted/60
          hover:shadow-sm
          transition-all
        "
              >
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="text-sm font-semibold truncate">
                    {workspace?.name || "Workspace"}
                  </span>
                  <span className="text-xs tracking-wide text-muted-foreground">
                    Kolekcja
                  </span>
                </div>

                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            align="start"
            className="w-56 rounded-lg border shadow-md"
          >
            {workspaces.map((ws) => {
              const IconComp = ws.icon ? workspaceIconOptions[ws.icon] : null;

              return (
                <DropdownMenuItem
                  key={ws._id}
                  className="flex items-center gap-2"
                  onClick={() => navigate(`/workspace/${ws._id}`)}
                >
                  {IconComp && (
                    <IconComp
                      className="w-4 h-4"
                      style={{ color: ws.labelColor }}
                    />
                  )}
                  <span className="truncate">{ws.name}</span>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuItem
              className="text-primary font-medium border-t mt-1"
              onClick={() => {}}
            >
              + Nowa kolekcja
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-1 min-h-0  ">
        {/* LEFT ICON SIDEBAR */}
        <div className="w-16 border-r bg-card/95 flex flex-col justify-between pt-2.5">
          <div className="flex flex-col gap-3 px-2 mt-2">
            <Button
              size="icon"
              variant="secondary"
              // disabled={!permissions?.addArticle}
              className="w-10 h-10 ml-1 p-0 group hover:bg-primary  rounded-lg   transition-all"
              onClick={onOpenNewArticle}
            >
              <Plus
                size={20}
                className="group-hover:text-primary-foreground  "
              />
            </Button>

            <WorkspaceSidebarNavLinks workspaceId={workspace.id} />
          </div>

          <div className="p-2 mb-1 border-t">
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 bg-primary/30 hover:bg-primary/60 "
              onClick={() => navigate("/")}
            >
              <ArrowBigLeft />
            </Button>
          </div>
        </div>

        {/* RIGHT FOLDERS SIDEBAR */}
        <div className="w-[274px] min-w-[260px] max-w-[300px] backdrop-blur-sm flex flex-col min-h-0  bg-sidebar">
          {/* HEADER */}
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
              Foldery
            </span>

            {permissions?.addFolder ? (
              <Button
                size="icon"
                variant="ghost"
                className="size-6 opacity-70 hover:opacity-100"
                onClick={onAddFolder}
              >
                <Plus size={14} />
              </Button>
            ) : (
              <Lock className="size-4 text-muted-foreground opacity-60" />
            )}
          </div>

          {/* LIST */}
          <nav className="flex-1 overflow-y-auto px-3 py-2 pb-14 space-y-0.5">
            {folders.map((folder) => (
              <NavLink
                key={folder.id}
                to={`/workspace/${workspace.id}/folders/${folder.id}`}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center justify-between",
                    "h-9 px-2.5 rounded-lg",
                    "transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {/* active indicator */}
                    {isActive && (
                      <span
                        className="
                absolute left-0
                h-5 w-0.5
                rounded-r-full
                bg-primary
              "
                      />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      {isActive ? (
                        <FolderOpen
                          size={15}
                          className="shrink-0 text-primary transition-colors"
                        />
                      ) : (
                        <FolderClosed
                          size={15}
                          className="
                  shrink-0
                  text-muted-foreground
                  group-hover:text-foreground
                  transition-colors
                "
                        />
                      )}

                      <span
                        className="
                truncate
                text-sm
                font-medium
                tracking-tight
              "
                      >
                        {folder.name}
                      </span>
                    </div>

                    {folder.articlesCount > 0 && (
                      <span
                        className="
                ml-2
                rounded-md
                bg-muted
                px-1.5
                py-0.5
                text-[11px]
                tabular-nums
                text-muted-foreground
                transition-colors
                group-hover:bg-background
              "
                      >
                        {folder.articlesCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
