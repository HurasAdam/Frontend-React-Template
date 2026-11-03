"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FileText, Plus, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFindArticlesQuery } from "../../../../hooks/articles/queries/use-articles.queries";

type ArticleReviewStatus =
  | "DRAFT"
  | "APPROVED"
  | "REQUIRES_REVERIFICATION"
  | "PENDING_REVIEW"
  | "CHANGES_REQUESTED";

type ArticlePublicationStatus = "UNPUBLISHED" | "PUBLISHED" | "ARCHIVED";

type ImportantMarker = "star" | null;

type Article = {
  id: string;
  title: string;
  reviewStatus: ArticleReviewStatus;
  requiresReverification: boolean;
  publicationStatus: ArticlePublicationStatus;
  updatedAt: string;
  importantMarker: "star" | "pin" | "warning" | null;
  product: {
    id: string;
    name: string;
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
};
const statusConfig: Record<
  ArticleStatus,
  {
    label: string;
    className: string;
  }
> = {
  DRAFT: {
    label: "Wersja robocza",
    className: "bg-muted text-muted-foreground border-border",
  },
  PENDING_REVIEW: {
    label: "Wymaga weryfikacji",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  APPROVED: {
    label: "Zweryfikowany",
    className: "bg-success/10 text-success border-success/20",
  },
  REQUIRES_REVERIFICATION: {
    label: "Wymaga weryfikacji",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  CHANGES_REQUESTED: {
    label: "Wymaga weryfikacji",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  ARCHIVED: {
    label: "Zarchiwizowany",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function ArticlesPage() {
  const { data: articles = [] } = useFindArticlesQuery();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const products = useMemo(() => {
    const productsMap = new Map<string, { id: string; name: string }>();

    articles.forEach((article: Article) => {
      if (article.product) {
        productsMap.set(article.product.id, article.product);
      }
    });

    return [...productsMap.values()];
  }, [articles]);

  const categories = useMemo(() => {
    const categoriesMap = new Map<string, { id: string; name: string }>();

    articles.forEach((article: Article) => {
      if (article.category) {
        categoriesMap.set(article.category.id, article.category);
      }
    });

    return [...categoriesMap.values()];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...articles]
      .filter((article: Article) => {
        if (!normalizedSearch) {
          return true;
        }

        const searchableText = [
          article.title,
          article.product?.name,
          article.category?.name,
          ...article.tags.map((tag) => tag.name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      })
      .filter((article: Article) => {
        if (statusFilter === "all") {
          return true;
        }

        return article.status === statusFilter;
      })
      .filter((article: Article) => {
        if (productFilter === "all") {
          return true;
        }

        return article.product?.id === productFilter;
      })
      .filter((article: Article) => {
        if (categoryFilter === "all") {
          return true;
        }

        return article.category?.id === categoryFilter;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [articles, search, statusFilter, productFilter, categoryFilter]);

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    productFilter !== "all" ||
    categoryFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setProductFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            Baza artykułów
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Wyszukaj gotowy szabkon odpowiedzi.
          </p>
        </div>

        <Button className="shrink-0">
          <Plus className="size-4" />
          Dodaj artykuł
        </Button>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Szukaj artykułów..."
              className="h-9 pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-full lg:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Wszystkie statusy</SelectItem>
              <SelectItem value="DRAFT">Wersja robocza</SelectItem>
              <SelectItem value="PENDING_REVIEW">Do weryfikacji</SelectItem>
              <SelectItem value="APPROVED">Zweryfikowany</SelectItem>
              <SelectItem value="REJECTED">Odrzucony</SelectItem>
              <SelectItem value="ARCHIVED">Zarchiwizowany</SelectItem>
            </SelectContent>
          </Select>

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="h-9 w-full lg:w-[170px]">
              <SelectValue placeholder="Produkt" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Wszystkie produkty</SelectItem>

              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-9 w-full lg:w-[190px]">
              <SelectValue placeholder="Kategoria" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Wszystkie kategorie</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0"
              onClick={clearFilters}
              aria-label="Wyczyść filtry"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1
              ? "artykuł"
              : filteredArticles.length >= 2 && filteredArticles.length <= 4
                ? "artykuły"
                : "artykułów"}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {/* List header */}
        <div
          className="
            hidden
            items-center
            gap-4
            px-4
            text-[10px]
            font-medium
            uppercase
            tracking-wider
            text-muted-foreground
            sm:flex
          "
        >
          <div className="w-9 shrink-0" />

          <div className="min-w-0 flex-1">Tytuł / Produkt / Kategoria</div>

          <div className="w-[220px] shrink-0">Tagi</div>

          <div className="w-[120px] shrink-0 text-right">Status</div>
        </div>

        {filteredArticles.length === 0 ? (
          <Card className="border-border/70 shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-muted">
                <FileText className="size-5 text-muted-foreground" />
              </div>

              <h3 className="text-sm font-medium">Nie znaleziono artykułów</h3>

              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                Spróbuj zmienić kryteria wyszukiwania lub wyczyścić aktywne
                filtry.
              </p>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Wyczyść filtry
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredArticles.map((article: Article) => {
            const isImportant = article.importantMarker === "star";

            const visibleTags: string[] = [];
            let hiddenCount = 0;
            let currentLength = 0;

            for (let i = 0; i < article.tags.length; i++) {
              const tag = `#${article.tags[i].name}`;

              const nextLength =
                currentLength === 0
                  ? tag.length
                  : currentLength + tag.length + 1;

              if (nextLength <= 48) {
                visibleTags.push(tag);
                currentLength = nextLength;
              } else {
                hiddenCount = article.tags.length - i;
                break;
              }
            }

            const status = article.requiresReverification
              ? {
                  label: "Wymaga weryfikacji",
                  className:
                    "bg-amber-500/10 text-amber-600 border-amber-500/20",
                }
              : statusConfig[article.reviewStatus];

            return (
              <Link to={`/articles/${article.id}`} className="block">
                <Card
                  key={article.id}
                  className="
                  group
                  cursor-pointer
                  border-border/70
                  shadow-none
                  transition-colors
                  hover:border-primary/30
                  hover:bg-accent/20
                "
                >
                  <CardContent className="px-4 py-3.5">
                    <div className="flex items-start gap-4">
                      {/* Article icon */}
                      <div
                        className={cn(
                          `
                          mt-0.5
                          flex
                          size-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          transition-colors
                        `,
                          isImportant
                            ? "bg-amber-500/5"
                            : "bg-muted group-hover:bg-primary/10",
                        )}
                      >
                        {isImportant ? (
                          <Star className="size-4 fill-amber-500/80 text-amber-500/80" />
                        ) : (
                          <FileText
                            className="
                            size-4
                            text-muted-foreground
                            transition-colors
                            group-hover:text-primary
                          "
                          />
                        )}
                      </div>

                      {/* Article */}
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center">
                          <h3
                            className="
                            min-w-0
                            truncate
                            text-sm
                            font-medium
                            text-foreground
                            transition-colors
                            group-hover:text-primary
                          "
                          >
                            {article.title}
                          </h3>
                        </div>

                        <div className="mt-1 flex min-w-0 items-center gap-2">
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {article.product?.name ?? "Nieznany produkt"}
                          </span>

                          <span className="shrink-0 text-[10px] text-border">
                            /
                          </span>

                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {article.category?.name ?? "Nieznana kategoria"}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="hidden w-[220px] shrink-0 sm:block">
                        <div
                          className="
                          flex
                          h-10
                          flex-wrap
                          content-start
                          items-start
                          gap-x-2
                          gap-y-0.5
                          overflow-hidden
                        "
                        >
                          {visibleTags.map((tag, index) => (
                            <span
                              key={`${article.id}-tag-${index}`}
                              className="
                              shrink-0
                              whitespace-nowrap
                              text-[11px]
                              leading-5
                              text-muted-foreground
                            "
                            >
                              {tag}
                            </span>
                          ))}

                          {hiddenCount > 0 && (
                            <span
                              className="
                              shrink-0
                              whitespace-nowrap
                              text-[11px]
                              font-medium
                              leading-5
                              text-muted-foreground
                            "
                            >
                              +{hiddenCount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="w-[120px] shrink-0 text-right">
                        <Badge
                          variant="outline"
                          className={cn(
                            "whitespace-nowrap text-[10px] font-medium",
                            status.className,
                          )}
                        >
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
