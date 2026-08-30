export function HeaderSectionSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="size-10 animate-pulse rounded-lg bg-muted" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>

          <div className="size-8 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </aside>
  );
}
