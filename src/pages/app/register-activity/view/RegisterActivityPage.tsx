import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useFindAllTopicsQuery } from "../../../../hooks/product-topics/queries/use-product-topic-queries";

import { Button } from "../../../../components/ui/button";
import { FilterSection } from "../components/FilterSection";
import { TopicsSection } from "../components/TopicsSection";

export type ContactType = "phone" | "message";

export interface TopicProduct {
  id: string;
  name: string;
  labelColor: string;
}

export interface Topic {
  id: string;
  name: string;
  product: TopicProduct;
}

export function RegisterActivityPage() {
  const { data: activityTopics = [] } = useFindAllTopicsQuery();

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");

  const topics = activityTopics as Topic[];

  const products = useMemo(() => {
    const uniqueProducts = new Map<string, TopicProduct>();

    topics.forEach((topic) => {
      uniqueProducts.set(topic.product.id, topic.product);
    });

    return Array.from(uniqueProducts.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "pl"),
    );
  }, [topics]);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};

    topics.forEach((topic) => {
      result[topic.product.id] = (result[topic.product.id] ?? 0) + 1;
    });

    return result;
  }, [topics]);

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pl");

    return topics.filter((topic) => {
      const matchesSearch =
        !query ||
        topic.name.toLocaleLowerCase("pl").includes(query) ||
        topic.product.name.toLocaleLowerCase("pl").includes(query);

      const matchesProduct =
        selectedProduct === "all" || topic.product.id === selectedProduct;

      return matchesSearch && matchesProduct;
    });
  }, [topics, search, selectedProduct]);

  const groupedTopics = useMemo(() => {
    const groups = new Map<string, Topic[]>();

    filteredTopics.forEach((topic) => {
      const existing = groups.get(topic.product.id);

      if (existing) {
        existing.push(topic);
      } else {
        groups.set(topic.product.id, [topic]);
      }
    });

    return Array.from(groups.entries())
      .map(([, topicList]) => ({
        product: topicList[0].product,
        topics: topicList,
      }))
      .sort((a, b) => a.product.name.localeCompare(b.product.name, "pl"));
  }, [filteredTopics]);

  const clearFilters = () => {
    setSearch("");
    setSelectedProduct("all");
  };

  const hasActiveFilters =
    search.trim().length > 0 || selectedProduct !== "all";

  const productCount = groupedTopics.length;

  const topicCount = filteredTopics.length;

  const topicLabel =
    topicCount === 1
      ? "temat"
      : topicCount >= 2 && topicCount <= 4
        ? "tematy"
        : "tematów";

  const productLabel =
    productCount === 1
      ? "produkt"
      : productCount >= 2 && productCount <= 4
        ? "produkty"
        : "produktów";

  return (
    <main className="min-h-full w-full min-w-0 pb-10 text-foreground">
      <div className="mx-auto w-full">
        {/* Page header */}

        <header className="mb-8 border-b border-border/70 pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                Rejestr zgłoszeń
              </h1>

              <p className="max-w-xl text-sm text-muted-foreground">
                Odnotuj temat poruszony podczas kontaktu z użytkownikiem.
              </p>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={() => {}}
              className="shrink-0 gap-2"
            >
              <Plus className="size-4" />
              Dodaj temat
            </Button>
          </div>
        </header>
        {/* Filters */}

        <section aria-label="Filtrowanie tematów" className="mb-9">
          <FilterSection
            search={search}
            products={products}
            counts={counts}
            selectedProduct={selectedProduct}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            setSearch={setSearch}
            setSelectedProduct={setSelectedProduct}
          />
        </section>

        {/* Topics header */}

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Dostępne tematy
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Wybierz temat, aby zarejestrować kontakt z użytkownikiem.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Search className="size-3.5" />

            <span className="tabular-nums">
              {filteredTopics.length} / {topics.length}
            </span>
          </div>
        </div>

        {/* Topics */}

        <TopicsSection
          topics={groupedTopics}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />
      </div>
    </main>
  );
}
