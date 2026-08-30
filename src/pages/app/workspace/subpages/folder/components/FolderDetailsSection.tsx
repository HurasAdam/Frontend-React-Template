import { CalendarDays, FileText } from "lucide-react";
import type { IFolderDetails } from "../../../../../../services/workspace-articles/types";
import { formatDate } from "../utils";

export function FolderDetailsSection({
  folder,
  articleCount,
}: {
  folder: IFolderDetails;
  articleCount: number;
}) {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="space-y-6 p-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Opis folderu
          </p>

          <p className="mt-1.5 text-sm leading-6 text-foreground">
            {folder.description || "Brak opisu folderu."}
          </p>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-start gap-2.5">
            <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Liczba szablonów</p>

              <p className="mt-0.5 text-sm font-medium text-foreground">
                {articleCount}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Utworzono</p>

              <p className="mt-0.5 text-sm font-medium text-foreground">
                {formatDate(folder.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
