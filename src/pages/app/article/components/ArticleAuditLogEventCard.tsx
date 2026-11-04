import { Clock3, GitCompareArrows, UserRound } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  categoryConfig,
  type HistoryCategory,
  type HistoryEntry,
} from "../view/ArticleHistoryPage";

export function ArticleAuditLogEventCard({
  entry,
  onShowDetails,
}: {
  entry: HistoryEntry;
  onShowDetails: (entry: HistoryEntry) => void;
}) {
  const config = categoryConfig[entry.category];

  return (
    <article className="relative flex gap-4">
      <HistoryEventIcon category={entry.category} />

      <div className="min-w-0 flex-1 pb-7">
        <div className="rounded-2xl border border-border/80 bg-card shadow-sm shadow-black/[0.02] transition-colors hover:border-border">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                  >
                    {config.label}
                  </Badge>

                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    {entry.timestamp}
                  </span>
                </div>

                <h3 className="text-sm font-semibold tracking-tight sm:text-[15px]">
                  {entry.title}
                </h3>

                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>

              {entry.details.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 shrink-0 gap-1.5 self-start rounded-lg px-2.5 text-xs"
                  onClick={() => onShowDetails(entry)}
                >
                  <GitCompareArrows className="size-3.5" />
                  Szczegóły zmian
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2.5 border-t border-border/70 pt-3.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-semibold text-foreground">
                {entry.actor.initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">
                  {entry.actor.name}
                </p>

                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {entry.actor.role}
                </p>
              </div>

              <div className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
                <UserRound className="size-3.5" />
                Wykonawca zmiany
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// History event icon
// -----------------------------------------------------------------------------

function HistoryEventIcon({ category }: { category: HistoryCategory }) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div
      className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/60 ${config.backgroundClass}`}
    >
      <Icon className={`size-[18px] ${config.iconClass}`} />
    </div>
  );
}
