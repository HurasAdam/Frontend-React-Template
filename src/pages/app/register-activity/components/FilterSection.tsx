import { Search, X } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { cn } from "../../../../lib/utils";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ProductFilterCombobox } from "./ProductFilterCombobox";

export function FilterSection({
  search,
  setSearch,
  products,
  selectedProduct,
  setSelectedProduct,
  counts,
  hasActiveFilters,
  clearFilters,
}) {
  return (
    <div className="mb-8">
      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-border/60",
          "bg-card/50 p-2",
          "shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
          "lg:flex-row lg:items-center",
        )}
      >
        {/* Search */}

        <div className="relative min-w-0 flex-1">
          <Search
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 z-10",
              "h-4 w-4 -translate-y-1/2",
              "text-muted-foreground/60",
            )}
          />

          <Input
            placeholder="Szukaj tematów..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={cn(
              "h-10 w-full rounded-xl border-0 bg-background",
              "pl-10 pr-9",
              "text-sm shadow-none",
              "placeholder:text-muted-foreground/55",
              "focus-visible:ring-1 focus-visible:ring-primary/20",
            )}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className={cn(
                "absolute right-2.5 top-1/2 -translate-y-1/2",
                "flex h-6 w-6 items-center justify-center rounded-md",
                "text-muted-foreground/60",
                "transition-colors",
                "hover:bg-muted hover:text-foreground",
              )}
              aria-label="Wyczyść wyszukiwanie"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Divider */}

        <div className="hidden h-6 w-px bg-border/60 lg:block" />

        {/* Product filter */}

        <div className="w-full lg:w-[250px] lg:shrink-0">
          <ProductFilterCombobox
            products={products}
            selected={selectedProduct}
            onSelect={setSelectedProduct}
            counts={counts}
          />
        </div>

        {/* Clear */}

        <button
          type="button"
          onClick={hasActiveFilters ? clearFilters : undefined}
          disabled={!hasActiveFilters}
          aria-disabled={!hasActiveFilters}
          className={cn(
            "flex h-10 shrink-0 items-center justify-center gap-1.5",
            "rounded-xl px-3",
            "text-xs font-medium",
            "transition-colors duration-150",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary/20",
            hasActiveFilters
              ? "text-muted-foreground hover:bg-muted hover:text-foreground"
              : "cursor-default text-muted-foreground/35",
          )}
        >
          <X className="h-3.5 w-3.5" />

          <span>Wyczyść</span>
        </button>
      </div>

      {/* Active filters */}

      {hasActiveFilters && (
        <ActiveFilterChips
          products={products}
          selectedProduct={selectedProduct}
          search={search}
          onClearProduct={() => setSelectedProduct("all")}
          onClearSearch={() => setSearch("")}
        />
      )}
    </div>
  );
}
