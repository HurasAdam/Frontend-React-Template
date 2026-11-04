import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  GitCompareArrows,
  UserRound,
} from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { categoryConfig, type HistoryEntry } from "../view/ArticleHistoryPage";

export function ArticleAuditLogDetailsModal({
  entry,
  onOpenChange,
}: {
  entry: HistoryEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={Boolean(entry)} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] min-h-0 max-h-[850px] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
        {entry && (
          <>
            {/* Header */}
            <DialogHeader className="shrink-0 border-b border-border px-7 py-6 pr-12">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-md px-2.5 py-1 text-xs font-medium"
                >
                  {categoryConfig[entry.category].label}
                </Badge>

                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  {entry.dateLabel}, {entry.timestamp}
                </span>
              </div>

              <DialogTitle className="text-xl font-semibold tracking-tight">
                {entry.title}
              </DialogTitle>

              <DialogDescription className="mt-1.5 max-w-3xl text-sm leading-relaxed">
                {entry.description}
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6 scrollbar-custom">
              {/* Actor */}
              <div className="mb-8 flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">
                  {entry.actor.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">{entry.actor.name}</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {entry.actor.role}
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <UserRound className="size-4" />
                  <span>Wykonawca zdarzenia</span>
                </div>
              </div>

              {/* Changes heading */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <GitCompareArrows className="size-4 text-muted-foreground" />

                  <h3 className="text-sm font-semibold">Szczegóły zmian</h3>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Porównanie wartości przed i po wykonaniu operacji.
                </p>
              </div>

              {/* Changes */}
              {entry.details.length > 0 ? (
                <HistoryChangeDetails details={entry.details} />
              ) : (
                <div className="rounded-xl border border-dashed border-border py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Brak dodatkowych szczegółów tego zdarzenia.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function HistoryChangeDetails({
  details,
}: {
  details: HistoryEntry["details"];
}) {
  return (
    <div className="space-y-5">
      {details.map((detail, index) => (
        <div key={`${detail.label}-${index}`} className="space-y-2.5">
          <h4 className="text-sm font-semibold">{detail.label}</h4>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2.5">
                <ArrowDownRight className="size-3.5 text-muted-foreground" />

                <span className="text-xs font-medium text-muted-foreground">
                  Przed zmianą
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto p-3 scrollbar-custom">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                  {detail.before ?? "Brak wcześniejszej wartości"}
                </p>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/[0.035]">
              <div className="flex items-center gap-2 border-b border-emerald-500/15 px-3 py-2.5">
                <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />

                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Po zmianie
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto p-3 scrollbar-custom">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {detail.after ?? "Brak nowej wartości"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
