export function ArticleRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      <div className="size-9 shrink-0 animate-pulse rounded-lg bg-muted" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
      </div>

      <div className="size-8 shrink-0 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
