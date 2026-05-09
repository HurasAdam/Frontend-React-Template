import { Search } from "lucide-react";

export const TagsFilterSection = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-3 text-muted-foreground"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Szukaj tagu..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
        />
      </div>
    </div>
  );
};
