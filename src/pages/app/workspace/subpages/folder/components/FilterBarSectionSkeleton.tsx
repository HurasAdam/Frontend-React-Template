export function FilterBarSectionSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3.5">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-40 animate-pulse rounded bg-muted" />
      </div>

      <div className="space-y-1 p-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
          >
            <div className="size-7 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="ml-auto h-3 w-5 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </aside>
  );
}
