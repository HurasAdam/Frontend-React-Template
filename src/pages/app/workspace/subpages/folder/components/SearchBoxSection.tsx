import { Search } from "lucide-react";
import { cn } from "../../../../../../lib/utils";

export function SearchBoxSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Wyszukaj szablon..."
          className={cn(
            "h-10 w-full rounded-lg border border-border bg-background",
            "pl-9 pr-3 text-sm text-foreground",
            "outline-none transition-colors",
            "placeholder:text-muted-foreground",
            "focus:border-ring focus:ring-2 focus:ring-ring/20",
          )}
        />
      </div>
    </div>
  );
}
