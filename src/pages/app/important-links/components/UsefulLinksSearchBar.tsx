import { Search, X } from "lucide-react";

import { Input } from "../../../../components/ui/input";
import { cn } from "../../../../lib/utils";

interface Category {
  id: string;
  name: string;
}

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const UsefulLinksSearchBar = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative min-w-[220px] max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Szukaj linków..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-9"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            selectedCategory === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          Wszystkie
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              selectedCategory === category.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
