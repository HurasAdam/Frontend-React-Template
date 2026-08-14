"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { useFindUsefullLinksWithCategoryQuery } from "../../../../hooks/usefullLinks/queries/usefullLinks.queries";
import { UsefulLinksCategorySection } from "../components/UsefulLinksCategorySection";
import { UsefulLinksHeader } from "../components/UsefulLinksHeader";
import { UsefulLinksSearchBar } from "../components/UsefulLinksSearchBar";

export function UsefullLinksPage({
  openAddLink,
  openLinkInfo,
  openAddCategory,
}) {
  const { data = [], isLoading } = useFindUsefullLinksWithCategoryQuery();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const map = new Map();

    data.forEach((link) => {
      map.set(link.category.id, link.category);
    });

    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const filtered = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (link) =>
          link.name.toLowerCase().includes(q) ||
          link.description.toLowerCase().includes(q),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((link) => link.category.id === selectedCategory);
    }

    return result;
  }, [data, search, selectedCategory]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 rounded bg-muted" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="h-36" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <UsefulLinksHeader
        openAddLink={openAddLink}
        openAddCategory={openAddCategory}
      />
      <UsefulLinksSearchBar
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <UsefulLinksCategorySection
        links={filtered}
        hasLinks={data.length > 0}
        openLinkInfo={openLinkInfo}
        openAddLink={openAddLink}
      />
    </div>
  );
}
