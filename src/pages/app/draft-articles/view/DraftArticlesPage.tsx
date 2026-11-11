import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderClosed,
  Package,
  Plus,
  Search,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFindDraftArticlesQuery } from "../../../../hooks/articles/queries/use-articles.queries";
import { useFindCategoriesByProductQuery } from "../../../../hooks/product-categories/queries/use-product-categories.queries";
import { useFindProductsQuery } from "../../../../hooks/products/queries/use-products.queries";

type ArticleReviewStatus = "DRAFT" | "CHANGES_REQUESTED";

type Article = {
  id: string;
  title: string;
  reviewStatus: ArticleReviewStatus;
  publicationStatus: "UNPUBLISHED";
  createdAt: string;
  updatedAt: string | null;
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

type Product = {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  labelColor: string;
};

const PAGE_SIZE = 50;

const reviewStatusConfig: Record<
  ArticleReviewStatus,
  { label: string; className: string; dotClassName: string }
> = {
  DRAFT: {
    label: "Nowy wpis",
    className:
      "border-sky-500/20 bg-sky-500/[0.07] text-sky-600 dark:text-sky-400",
    dotClassName: "bg-sky-500",
  },
  CHANGES_REQUESTED: {
    label: "Do poprawy",
    className:
      "border-orange-500/20 bg-orange-500/[0.07] text-orange-600 dark:text-orange-400",
    dotClassName: "bg-orange-500",
  },
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const pluralizeArticles = (count: number) => {
  if (count === 1) return "artykuł";
  if (count >= 2 && count <= 4) return "artykuły";
  return "artykułów";
};

export function DraftArticlesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL jest źródłem prawdy dla filtrów i paginacji.
  const searchParam = searchParams.get("search") ?? "";
  const productFilter = searchParams.get("product") ?? "all";
  const categoryFilter = searchParams.get("category") ?? "all";

  const parsedPage = Number(searchParams.get("page"));
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [search, setSearch] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);

  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // Debounce wyszukiwania.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  // Synchronizacja z URL, np. podczas nawigacji wstecz/do przodu.
  useEffect(() => {
    setSearch(searchParam);
    setDebouncedSearch(searchParam);
  }, [searchParam]);

  // Aktualizacja URL po zakończeniu debounce.
  useEffect(() => {
    if (debouncedSearch === searchParam) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (debouncedSearch) {
          next.set("search", debouncedSearch);
        } else {
          next.delete("search");
        }

        next.delete("page");

        return next;
      },
      { replace: true },
    );
  }, [debouncedSearch, searchParam, setSearchParams]);

  // Pobieranie wyłącznie szkiców i wpisów wymagających poprawek.
  const { data: articlesResponse, isLoading: isArticlesLoading } =
    useFindDraftArticlesQuery({
      search: debouncedSearch || undefined,
      product: productFilter !== "all" ? productFilter : undefined,
      category: categoryFilter !== "all" ? categoryFilter : undefined,
      page: currentPage,
      limit: PAGE_SIZE,
    });

  const articles = articlesResponse?.data ?? [];
  const pagination = articlesResponse?.pagination;

  const { data: products = [] } = useFindProductsQuery({});

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useFindCategoriesByProductQuery(
      productFilter === "all" ? null : productFilter,
    );

  const selectedProduct = products.find(
    (product: Product) => product.id === productFilter,
  );

  const selectedCategory = categories.find(
    (category) => category.id === categoryFilter,
  );

  const hasActiveFilters =
    search.trim() !== "" || productFilter !== "all" || categoryFilter !== "all";

  // Zmiana produktu resetuje kategorię i paginację.
  const handleProductChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "all") {
        next.delete("product");
      } else {
        next.set("product", value);
      }

      next.delete("category");
      next.delete("page");

      return next;
    });

    setOpenProduct(false);
    setOpenCategory(false);
  };

  // Zmiana kategorii resetuje paginację.
  const handleCategoryChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "all") {
        next.delete("category");
      } else {
        next.set("category", value);
      }

      next.delete("page");

      return next;
    });

    setOpenCategory(false);
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("search");
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSearchParams({});
    setOpenProduct(false);
    setOpenCategory(false);
  };

  // Zmiana strony.
  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (page <= 1) {
        next.delete("page");
      } else {
        next.set("page", String(page));
      }

      return next;
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-4">
      {/* Page header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="min-w-0 space-y-1.5">
          <h1 className="text-[22px] font-semibold tracking-[-0.035em] sm:text-2xl">
            Nowe artykuły
          </h1>

          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Przeglądaj i edytuj wpisy przed publikacją.
          </p>
        </div>

        <Button
          onClick={() => navigate("/articles/new")}
          className="h-10 shrink-0 gap-2 rounded-lg px-4 text-[13px] shadow-sm"
        >
          <Plus className="size-4" />
          Dodaj artykuł
        </Button>
      </section>

      {/* Results summary + top pagination */}
      {!isArticlesLoading && pagination && pagination.total > 0 && (
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted-foreground">
            Wyświetlono{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            z{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {pagination.total}
            </span>{" "}
            {pluralizeArticles(pagination.total)}
          </p>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="whitespace-nowrap text-[11px] tabular-nums text-muted-foreground">
              Strona{" "}
              <span className="font-medium text-foreground">
                {pagination.page}
              </span>{" "}
              z {pagination.totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="h-8 rounded-lg px-3 text-[11px]"
              >
                <ChevronRight className="mr-1 size-3.5 rotate-180" />
                Poprzednia
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="h-8 rounded-lg px-3 text-[11px]"
              >
                Następna
                <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Szukaj artykułów, produktów, kategorii..."
              className="h-10 border-border/60 bg-background pl-9 pr-9 text-[13px] shadow-none placeholder:text-muted-foreground/55 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Wyczyść wyszukiwanie"
                className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Product */}
          <Popover open={openProduct} onOpenChange={setOpenProduct}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={openProduct}
                className={cn(
                  "h-10 w-full justify-between gap-2 rounded-lg border-border/60 bg-background px-3 text-[12px] font-medium shadow-none transition-colors hover:bg-muted/40 sm:w-[190px]",
                  productFilter !== "all" &&
                    "border-primary/30 bg-primary/[0.035] text-foreground",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {selectedProduct ? (
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: selectedProduct.labelColor,
                      }}
                    />
                  ) : (
                    <Package className="size-3.5 shrink-0 text-muted-foreground" />
                  )}

                  <span className="truncate">
                    {selectedProduct?.name ?? "Wszystkie produkty"}
                  </span>
                </span>

                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-[var(--radix-popover-trigger-width)] min-w-[230px] rounded-xl p-0"
            >
              <Command>
                <CommandInput placeholder="Wyszukaj produkt..." />
                <CommandList className="max-h-[280px]">
                  <CommandEmpty>Nie znaleziono produktu.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem
                      value="Wszystkie produkty"
                      onSelect={() => handleProductChange("all")}
                    >
                      <Package className="size-3.5 text-muted-foreground" />
                      Wszystkie produkty
                      <Check
                        className={cn(
                          "ml-auto size-4 text-primary",
                          productFilter === "all" ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>

                    {products.map((product: Product) => (
                      <CommandItem
                        key={product.id}
                        value={product.name}
                        onSelect={() => handleProductChange(product.id)}
                      >
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor: product.labelColor,
                          }}
                        />
                        <span className="truncate">{product.name}</span>

                        <Check
                          className={cn(
                            "ml-auto size-4 text-primary",
                            productFilter === product.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Category */}
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                disabled={productFilter === "all" || isCategoriesLoading}
                className={cn(
                  "h-10 w-full justify-between gap-2 rounded-lg border-border/60 bg-background px-3 text-[12px] font-medium shadow-none transition-colors hover:bg-muted/40 sm:w-[190px]",
                  categoryFilter !== "all" &&
                    "border-primary/30 bg-primary/[0.035] text-foreground",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FolderClosed className="size-3.5 shrink-0 text-muted-foreground" />

                  <span className="truncate">
                    {productFilter === "all"
                      ? "Wybierz produkt"
                      : isCategoriesLoading
                        ? "Ładowanie..."
                        : (selectedCategory?.name ?? "Wszystkie kategorie")}
                  </span>
                </span>

                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-[var(--radix-popover-trigger-width)] min-w-[230px] rounded-xl p-0"
            >
              <Command>
                <CommandInput placeholder="Wyszukaj kategorię..." />
                <CommandList className="max-h-[280px]">
                  <CommandEmpty>Nie znaleziono kategorii.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem
                      value="Wszystkie kategorie"
                      onSelect={() => handleCategoryChange("all")}
                    >
                      <FolderClosed className="size-3.5 text-muted-foreground" />
                      Wszystkie kategorie
                      <Check
                        className={cn(
                          "ml-auto size-4 text-primary",
                          categoryFilter === "all"
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>

                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => handleCategoryChange(category.id)}
                      >
                        <span className="truncate">{category.name}</span>

                        <Check
                          className={cn(
                            "ml-auto size-4 text-primary",
                            categoryFilter === category.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active filters */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
            <span className="mr-1 text-[11px] font-medium text-muted-foreground">
              Aktywne filtry:
            </span>

            {search.trim() && (
              <button
                type="button"
                onClick={clearSearch}
                className="group inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 text-[11px] text-foreground transition-colors hover:bg-muted"
              >
                <Search className="size-3 text-muted-foreground" />
                <span className="max-w-[150px] truncate">{search.trim()}</span>
                <X className="size-3 text-muted-foreground group-hover:text-foreground" />
              </button>
            )}

            {productFilter !== "all" && (
              <button
                type="button"
                onClick={() => handleProductChange("all")}
                className="group inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 text-[11px] text-foreground transition-colors hover:bg-muted"
              >
                {selectedProduct && (
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: selectedProduct.labelColor }}
                  />
                )}

                <span className="max-w-[150px] truncate">
                  {selectedProduct?.name ?? "Produkt"}
                </span>

                <X className="size-3 text-muted-foreground group-hover:text-foreground" />
              </button>
            )}

            {categoryFilter !== "all" && (
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className="group inline-flex h-7 items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 text-[11px] text-foreground transition-colors hover:bg-muted"
              >
                <FolderClosed className="size-3 text-muted-foreground" />

                <span className="max-w-[150px] truncate">
                  {selectedCategory?.name ?? "Kategoria"}
                </span>

                <X className="size-3 text-muted-foreground group-hover:text-foreground" />
              </button>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Wyczyść
            </button>
          </div>
        )}
      </section>

      {/* Draft article list */}
      <section>
        {isArticlesLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        ) : articles.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/[0.12] px-6 py-12 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-border/70 bg-card">
              <FileText className="size-5 text-muted-foreground" />
            </div>

            <h3 className="text-sm font-semibold">
              {hasActiveFilters
                ? "Nie znaleziono wpisów"
                : "Brak nowych wpisów"}
            </h3>

            <p className="mt-1.5 max-w-xs text-xs leading-5 text-muted-foreground">
              {hasActiveFilters
                ? "Zmień kryteria wyszukiwania lub usuń filtry, aby zobaczyć dostępne wpisy."
                : "W tym miejscu pojawią się nowe artykuły oczekujące na publikację oraz wpisy wymagające poprawek."}
            </p>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-5 h-9 rounded-lg"
              >
                Wyczyść filtry
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
            {/* Table header */}
            <div className="hidden grid-cols-[minmax(0,1fr)_190px_190px] items-center gap-4 border-b border-border/70 bg-muted/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground lg:grid">
              <span>Artykuł</span>
              <span>Tagi</span>
              <span className="text-right">Status</span>
            </div>

            <div className="divide-y divide-border/70">
              {articles.map((article: Article) => {
                const isImportant = article.importantMarker === "star";
                const status = reviewStatusConfig[article.reviewStatus];

                const visibleTags = article.tags.slice(0, 3);
                const hiddenTagsCount = Math.max(
                  0,
                  article.tags.length - visibleTags.length,
                );

                const articleDate = article.updatedAt ?? article.createdAt;

                return (
                  <Link
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className="group block outline-none transition-colors hover:bg-muted/35 focus-visible:bg-muted/40"
                  >
                    <div className="grid grid-cols-1 items-center gap-3 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_190px_190px] lg:gap-4">
                      {/* Article information */}
                      <div className="flex min-w-0 items-start gap-3.5">
                        <div
                          className={cn(
                            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                            isImportant
                              ? "border-amber-500/15 bg-amber-500/[0.07]"
                              : "border-border/70 bg-muted/50 group-hover:border-primary/20 group-hover:bg-primary/[0.05]",
                          )}
                        >
                          {isImportant ? (
                            <Star className="size-4 fill-amber-500 text-amber-500" />
                          ) : (
                            <FileText className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[13px] font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
                            {article.title}
                          </h3>

                          <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="truncate">
                              {article.product?.name ?? "Nieznany produkt"}
                            </span>

                            <span className="text-border">/</span>

                            <span className="truncate">
                              {article.category?.name ?? "Nieznana kategoria"}
                            </span>

                            <span className="hidden text-border sm:inline">
                              ·
                            </span>

                            <span className="hidden shrink-0 sm:inline">
                              {formatDate(articleDate)}
                            </span>
                          </div>

                          {/* Mobile status */}
                          <div className="mt-3 flex flex-wrap items-center gap-2 lg:hidden">
                            <Badge
                              variant="outline"
                              className={cn(
                                "h-[23px] gap-1.5 rounded-md px-2 text-[10px] font-medium",
                                status.className,
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1.5 rounded-full",
                                  status.dotClassName,
                                )}
                              />
                              {status.label}
                            </Badge>

                            <span className="text-[10px] text-muted-foreground sm:hidden">
                              {formatDate(articleDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="hidden min-w-0 items-center gap-1.5 overflow-hidden lg:flex">
                        {visibleTags.length > 0 ? (
                          <>
                            {visibleTags.map((tag) => (
                              <span
                                key={tag.id}
                                className="max-w-[100px] truncate rounded-md bg-muted/70 px-2 py-1 text-[10px] text-muted-foreground"
                              >
                                {tag.name}
                              </span>
                            ))}

                            {hiddenTagsCount > 0 && (
                              <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                                +{hiddenTagsCount}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50">
                            Brak tagów
                          </span>
                        )}
                      </div>

                      {/* Status */}
                      <div className="hidden items-center justify-end gap-3 lg:flex">
                        <Badge
                          variant="outline"
                          className={cn(
                            "h-[23px] gap-1.5 rounded-md px-2 text-[10px] font-medium",
                            status.className,
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              status.dotClassName,
                            )}
                          />
                          {status.label}
                        </Badge>

                        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/0 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Bottom pagination */}
      {!isArticlesLoading && pagination && pagination.total > 0 && (
        <section className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-muted-foreground">
            Wyświetlono{" "}
            <span className="font-medium text-foreground tabular-nums">
              {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            z{" "}
            <span className="font-medium text-foreground tabular-nums">
              {pagination.total}
            </span>{" "}
            {pluralizeArticles(pagination.total)}
          </p>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-[11px] text-muted-foreground tabular-nums">
              Strona {pagination.page} z {pagination.totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="h-8 rounded-lg px-3 text-[11px]"
              >
                <ChevronRight className="mr-1 size-3.5 rotate-180" />
                Poprzednia
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="h-8 rounded-lg px-3 text-[11px]"
              >
                Następna
                <ChevronRight className="ml-1 size-3.5" />
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
