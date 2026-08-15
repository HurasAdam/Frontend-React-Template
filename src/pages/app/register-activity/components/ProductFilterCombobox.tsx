import { Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { cn } from "../../../../lib/utils";
import type { TopicProduct } from "../view/RegisterActivityPage";

export function ProductFilterCombobox({
  products,
  selected,
  onSelect,
  counts,
}: {
  products: TopicProduct[];
  selected: string;
  onSelect: (id: string) => void;
  counts: Record<string, number>;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedProduct = products.find((product) => product.id === selected);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return q
      ? products.filter((product) => product.name.toLowerCase().includes(q))
      : products;
  }, [products, query]);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (!next) {
          setQuery("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-10 w-full items-center gap-2.5",
            "rounded-xl bg-background px-3",
            "text-sm",
            "transition-colors",
            "hover:bg-muted/50",
            "focus-visible:outline-none",
            "focus-visible:ring-1 focus-visible:ring-primary/20",
          )}
        >
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center",
              "rounded-md",
              !selectedProduct && "bg-muted",
            )}
            style={
              selectedProduct
                ? {
                    backgroundColor: `${selectedProduct.labelColor}15`,
                  }
                : undefined
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: selectedProduct?.labelColor ?? "currentColor",
              }}
            />
          </span>

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              !selectedProduct && "text-muted-foreground",
            )}
          >
            {selectedProduct?.name ?? "Wszystkie produkty"}
          </span>

          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground/60",
              "transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className={cn(
          "w-[var(--radix-popover-trigger-width)] min-w-[280px]",
          "overflow-hidden rounded-xl border-border/60 p-0",
          "shadow-lg",
        )}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Szukaj produktu..."
            value={query}
            onValueChange={setQuery}
            className="h-10"
          />

          <CommandList className="max-h-[320px]">
            <CommandEmpty className="py-8 text-sm">
              Nie znaleziono produktu.
            </CommandEmpty>

            <CommandGroup className="p-1.5">
              {/* Wszystkie produkty */}

              <CommandItem
                value="all"
                onSelect={() => {
                  onSelect("all");
                  setOpen(false);
                }}
                className="rounded-lg px-2.5 py-2"
              >
                <span
                  className={cn(
                    "mr-2 flex h-5 w-5 items-center justify-center rounded-md",
                    selected === "all"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted/70",
                  )}
                >
                  {selected === "all" && <Check className="h-3.5 w-3.5" />}
                </span>

                <span className="flex-1 font-medium">Wszystkie produkty</span>
              </CommandItem>

              {/* Products */}

              {filtered.map((product) => {
                const isSelected = selected === product.id;

                return (
                  <CommandItem
                    key={product.id}
                    value={product.id}
                    onSelect={() => {
                      onSelect(product.id);
                      setOpen(false);
                    }}
                    className="rounded-lg px-2.5 py-2"
                  >
                    <span
                      className={cn(
                        "mr-2 flex h-5 w-5 items-center justify-center rounded-md",
                        isSelected && "bg-primary/10",
                      )}
                    >
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      )}
                    </span>

                    <span
                      className="mr-2 h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: product.labelColor,
                      }}
                    />

                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate",
                        isSelected && "font-medium",
                      )}
                    >
                      {product.name}
                    </span>

                    <span className="text-[11px] tabular-nums text-muted-foreground/60">
                      {counts[product.id] ?? 0}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {/* Clear selected product */}

            {selected !== "all" && (
              <>
                <CommandSeparator />

                <CommandGroup className="p-1.5">
                  <CommandItem
                    value="clear"
                    onSelect={() => {
                      onSelect("all");
                      setOpen(false);
                    }}
                    className="justify-center rounded-lg text-xs text-muted-foreground"
                  >
                    Wyczyść filtr produktu
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
