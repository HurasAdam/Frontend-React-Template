export function FolderDetailsSectionSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="space-y-6 p-5">
        <div className="space-y-2">
          <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </aside>
  );
}
