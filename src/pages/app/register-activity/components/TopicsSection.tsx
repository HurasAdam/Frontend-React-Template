import { Search } from "lucide-react";

import { Button } from "../../../../components/ui/button";

import type { Topic, TopicProduct } from "../view/RegisterActivityPage";

import { TopicRow } from "./TopicRow";

interface Props {
  topics: {
    product: TopicProduct;
    topics: Topic[];
  }[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function TopicsSection({
  topics,
  hasActiveFilters,
  clearFilters,
}: Props) {
  if (topics.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl bg-muted/70 text-muted-foreground">
          <Search className="size-5" />
        </div>

        <h3 className="mt-4 text-sm font-semibold">Nie znaleziono tematów</h3>

        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Zmień wyszukiwaną frazę lub wybierz inny produkt.
        </p>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="mt-5 rounded-lg"
          >
            Wyczyść filtry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-9">
      {topics.map(({ product, topics: productTopics }) => (
        <section key={product.id}>
          {/* Product heading */}

          <div className="mb-3 flex items-center gap-3">
            <div
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: product.labelColor }}
            />

            <h3 className="text-xs font-semibold tracking-wide text-foreground/80">
              {product.name}
            </h3>

            <span className="rounded-md bg-muted/70 px-2 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
              {productTopics.length}
            </span>

            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Product topics */}

          <div className="space-y-2">
            {productTopics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
