import { Search } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const UsefulLinksSearchBar = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  totalCount,
  filteredCount,
  hasActiveFilters,
  onClearFilters,
}: Props) => {
  return (
    <section className="mb-7">
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Szukaj linków, opisów lub adresów..."
            aria-label="Szukaj przydatnych linków"
            className="h-10 rounded-xl pl-9"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={selectedCategory === "all" ? "secondary" : "ghost"}
            size="sm"
            aria-pressed={selectedCategory === "all"}
            className={
              selectedCategory === "all"
                ? "h-8 rounded-lg border border-border px-3 font-medium"
                : "h-8 rounded-lg px-3 font-normal text-muted-foreground"
            }
            onClick={() => onCategoryChange("all")}
          >
            Wszystkie
            <span className="ml-1.5 text-xs text-muted-foreground">
              {totalCount}
            </span>
          </Button>

          {categories.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <Button
                key={category.id}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={isActive}
                className={
                  isActive
                    ? "h-8 rounded-lg border border-border px-3 font-medium"
                    : "h-8 rounded-lg px-3 font-normal text-muted-foreground"
                }
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {category.count}
                </span>
              </Button>
            );
          })}

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-1 h-8 rounded-lg px-2 text-xs font-normal text-muted-foreground hover:text-foreground"
              onClick={onClearFilters}
            >
              Wyczyść filtry
            </Button>
          )}

          <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
            {filteredCount} {filteredCount === 1 ? "link" : "linków"}
          </span>
        </div>
      </div>
    </section>
  );
};
