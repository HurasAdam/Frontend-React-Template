import { Folder, MoreHorizontal } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import type { IFolderDetails } from "../../../../../../services/workspace-articles/types";

export function HeaderSection({ folder }: { folder: IFolderDetails }) {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                "bg-muted text-muted-foreground",
              )}
            >
              <Folder className="size-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">
                {folder.name}
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">Folder</p>
            </div>
          </div>

          <button
            type="button"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              "text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            )}
            aria-label="Opcje folderu"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
