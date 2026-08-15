import { useMemo, useState } from "react";
import { useFindAllTopicsQuery } from "../../../../hooks/product-topics/queries/use-product-topic-queries";

import { FilterSection } from "../components/FilterSection";
import { Header } from "../components/Header";
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
  const [selectedProduct, setSelectedProduct] = useState<string>("all");

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
    const query = search.trim().toLowerCase();

    return topics.filter((topic) => {
      const matchesSearch =
        !query ||
        topic.name.toLowerCase().includes(query) ||
        topic.product.name.toLowerCase().includes(query);

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

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full">
        <Header
          filteredTopics={filteredTopics}
          hasActiveFilters={hasActiveFilters}
        />

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

        <TopicsSection
          topics={groupedTopics}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        <div className="h-8" />
      </div>
    </div>
  );
}
