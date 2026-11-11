"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";

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
      const categoryId = link.category.id;
      const existing = map.get(categoryId);

      map.set(categoryId, {
        ...link.category,
        count: (existing?.count ?? 0) + 1,
      });
    });

    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "pl"));
  }, [data]);

  const filtered = useMemo(() => {
    let result = [...data];

    const query = search.trim().toLocaleLowerCase("pl");

    if (query) {
      result = result.filter((link) => {
        const searchableText = [
          link.name,
          link.description,
          link.url,
          link.category.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("pl");

        return searchableText.includes(query);
      });
    }

    if (selectedCategory !== "all") {
      result = result.filter((link) => link.category.id === selectedCategory);
    }

    return result;
  }, [data, search, selectedCategory]);

  const hasActiveFilters = search.trim() !== "" || selectedCategory !== "all";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
  };

  if (isLoading) {
    return (
      <div className="space-y-7 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-md bg-muted" />
          <div className="h-4 w-80 max-w-full rounded-md bg-muted" />
        </div>

        <div className="h-24 rounded-xl border bg-card" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="shadow-none">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/3 rounded bg-muted" />
                  </div>
                </div>
                <div className="h-8 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-7 animate-fade-in">
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
        totalCount={data.length}
        filteredCount={filtered.length}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <UsefulLinksCategorySection
        links={filtered}
        hasLinks={data.length > 0}
        hasActiveFilters={hasActiveFilters}
        openLinkInfo={openLinkInfo}
        openAddLink={openAddLink}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
