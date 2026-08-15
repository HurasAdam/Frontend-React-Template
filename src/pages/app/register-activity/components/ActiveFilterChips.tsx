import { Search, X } from "lucide-react";
import { cn } from "../../../../lib/utils";
import type { TopicProduct } from "../view/RegisterActivityPage";

export function ActiveFilterChips({
  products,
  selectedProduct,
  search,
  onClearProduct,
  onClearSearch,
}: {
  products: TopicProduct[];
  selectedProduct: string;
  search: string;
  onClearProduct: () => void;
  onClearSearch: () => void;
}) {
  const selectedProductData = products.find(
    (product) => product.id === selectedProduct,
  );

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 px-1">
      {/* Search filter */}

      {search.trim() && (
        <span
          className={cn(
            "inline-flex h-7 items-center gap-1.5",
            "rounded-lg border border-border/60",
            "bg-muted/40 px-2.5",
            "text-xs font-medium text-muted-foreground",
          )}
        >
          <Search className="h-3 w-3 text-muted-foreground/60" />

          <span className="max-w-[180px] truncate">„{search.trim()}"</span>

          <button
            type="button"
            onClick={onClearSearch}
            className="rounded-sm p-0.5 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Usuń filtr wyszukiwania"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      )}

      {/* Product filter */}

      {selectedProductData && (
        <span
          className={cn(
            "inline-flex h-7 items-center gap-1.5",
            "rounded-lg border border-border/60",
            "bg-muted/40 px-2.5",
            "text-xs font-medium text-muted-foreground",
          )}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: selectedProductData.labelColor,
            }}
          />

          <span className="max-w-[160px] truncate">
            {selectedProductData.name}
          </span>

          <button
            type="button"
            onClick={onClearProduct}
            className="rounded-sm p-0.5 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            aria-label={`Usuń filtr ${selectedProductData.name}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      )}
    </div>
  );
}
