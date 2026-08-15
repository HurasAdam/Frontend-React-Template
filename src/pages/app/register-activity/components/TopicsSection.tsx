import { Search } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

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
      <Card className="rounded-2xl border-dashed border-border/70 bg-card/40 shadow-none">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>

          <h3 className="mt-4 text-sm font-semibold">Nie znaleziono tematów</h3>

          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            Zmień wyszukiwaną frazę lub wybierz inny produkt.
          </p>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="mt-4 rounded-xl"
            >
              Wyczyść filtry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {topics.map(({ product, topics: productTopics }) => (
        <section key={product.id}>
          <div className="mb-3 flex items-center gap-3 px-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: product.labelColor,
              }}
            />

            <h2 className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
              {product.name}
            </h2>

            <div className="h-px flex-1 bg-border/50" />
          </div>

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
