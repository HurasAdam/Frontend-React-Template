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

type ArticleStatus =
  | "DRAFT"
  | "APPROVED"
  | "REJECTED"
  | "PENDING_REVIEW"
  | "ARCHIVED";

type ImportantMarker = "star" | null;

type MockArticle = {
  id: string;
  title: string;
  status: ArticleStatus;
  importantMarker: ImportantMarker;
  product: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

type MockProduct = {
  id: string;
  name: string;
};

type MockCategory = {
  id: string;
  name: string;
};

type MockTag = {
  id: string;
  name: string;
};

const mockProducts: MockProduct[] = [
  {
    id: "product-synergia",
    name: "Synergia",
  },
  {
    id: "product-librus-go",
    name: "Librus GO",
  },
  {
    id: "product-biblioteka",
    name: "Biblioteka",
  },
  {
    id: "product-mobile",
    name: "Aplikacja Mobilna",
  },
];

const mockCategories: MockCategory[] = [
  {
    id: "category-login",
    name: "Logowanie",
  },
  {
    id: "category-users",
    name: "Użytkownicy",
  },
  {
    id: "category-messages",
    name: "Wiadomości",
  },
  {
    id: "category-schedule",
    name: "Plan lekcji",
  },
  {
    id: "category-configuration",
    name: "Konfiguracja",
  },
  {
    id: "category-technical",
    name: "Problemy techniczne",
  },
];

const mockTags: MockTag[] = [
  {
    id: "login",
    name: "logowanie",
  },
  {
    id: "password",
    name: "hasło",
  },
  {
    id: "account",
    name: "konto",
  },
  {
    id: "browser",
    name: "przeglądarka",
  },
  {
    id: "cookies",
    name: "cookies",
  },
  {
    id: "schedule",
    name: "plan lekcji",
  },
  {
    id: "mobile",
    name: "mobilna",
  },
  {
    id: "messages",
    name: "wiadomości",
  },
  {
    id: "configuration",
    name: "konfiguracja",
  },
  {
    id: "error",
    name: "błąd",
  },
];

const mockArticles: MockArticle[] = [
  {
    id: "article-1",
    title: "Reset hasła",
    status: "APPROVED",
    importantMarker: "star",
    product: "product-synergia",
    category: "category-login",
    tags: ["login", "password", "account"],
    createdAt: "2026-09-01T10:00:00",
    updatedAt: "2026-09-12T14:30:00",
  },
  {
    id: "article-2",
    title: "Problem z logowaniem",
    status: "PENDING_REVIEW",
    importantMarker: null,
    product: "product-librus-go",
    category: "category-login",
    tags: ["login", "account", "error"],
    createdAt: "2026-09-02T09:30:00",
    updatedAt: "2026-09-12T11:45:00",
  },
  {
    id: "article-3",
    title: "Jak wyczyścić pamięć podręczną przeglądarki?",
    status: "APPROVED",
    importantMarker: null,
    product: "product-synergia",
    category: "category-technical",
    tags: ["browser", "cookies"],
    createdAt: "2026-09-03T12:00:00",
    updatedAt: "2026-09-11T15:10:00",
  },
  {
    id: "article-4",
    title: "Usuwanie wpisu z planu lekcji",
    status: "APPROVED",
    importantMarker: "star",
    product: "product-synergia",
    category: "category-schedule",
    tags: ["schedule", "configuration"],
    createdAt: "2026-09-04T08:15:00",
    updatedAt: "2026-09-10T09:20:00",
  },
  {
    id: "article-5",
    title: "Wiadomości nie wyświetlają się poprawnie w przeglądarce",
    status: "DRAFT",
    importantMarker: null,
    product: "product-synergia",
    category: "category-messages",
    tags: ["messages", "browser", "error"],
    createdAt: "2026-09-05T11:00:00",
    updatedAt: "2026-09-11T13:15:00",
  },
  {
    id: "article-6",
    title: "Konfiguracja konta użytkownika i podstawowych ustawień profilu",
    status: "APPROVED",
    importantMarker: null,
    product: "product-librus-go",
    category: "category-users",
    tags: ["account", "configuration"],
    createdAt: "2026-09-06T14:00:00",
    updatedAt: "2026-09-09T16:40:00",
  },
  {
    id: "article-7",
    title:
      "Brak synchronizacji danych w aplikacji mobilnej pomiędzy urządzeniem a systemem",
    status: "REJECTED",
    importantMarker: null,
    product: "product-mobile",
    category: "category-technical",
    tags: ["mobile", "error"],
    createdAt: "2026-09-07T09:00:00",
    updatedAt: "2026-09-08T10:30:00",
  },
  {
    id: "article-8",
    title:
      "Konfiguracja powiadomień użytkownika oraz dostępnych ustawień dotyczących komunikatów w systemie",
    status: "ARCHIVED",
    importantMarker: null,
    product: "product-biblioteka",
    category: "category-configuration",
    tags: ["configuration", "account", "notifications", "settings"],
    createdAt: "2026-08-20T09:00:00",
    updatedAt: "2026-08-25T12:10:00",
  },
  {
    id: "article-9",
    title: "Aktualizacja danych kontaktowych użytkownika",
    status: "APPROVED",
    importantMarker: null,
    product: "product-synergia",
    category: "category-users",
    tags: ["account", "configuration"],
    createdAt: "2026-09-05T10:00:00",
    updatedAt: "2026-09-07T13:20:00",
  },
  {
    id: "article-10",
    title:
      "Brak możliwości wysłania wiadomości do użytkownika i diagnostyka problemu z komunikacją w przeglądarce",
    status: "PENDING_REVIEW",
    importantMarker: "star",
    product: "product-synergia",
    category: "category-messages",
    tags: ["messages", "error", "browser"],
    createdAt: "2026-09-04T15:00:00",
    updatedAt: "2026-09-06T11:15:00",
  },
  {
    id: "article-11",
    title: "Nie można otworzyć strony logowania",
    status: "APPROVED",
    importantMarker: null,
    product: "product-synergia",
    category: "category-login",
    tags: ["login", "browser", "error"],
    createdAt: "2026-09-02T13:00:00",
    updatedAt: "2026-09-05T10:30:00",
  },
  {
    id: "article-12",
    title: "Zmiana hasła użytkownika po utracie dostępu do konta",
    status: "APPROVED",
    importantMarker: null,
    product: "product-librus-go",
    category: "category-login",
    tags: ["password", "account", "login"],
    createdAt: "2026-09-01T14:00:00",
    updatedAt: "2026-09-04T15:45:00",
  },
  {
    id: "article-13",
    title: "Nieprawidłowe dane użytkownika po aktualizacji profilu",
    status: "PENDING_REVIEW",
    importantMarker: null,
    product: "product-librus-go",
    category: "category-users",
    tags: ["account", "error"],
    createdAt: "2026-08-30T11:00:00",
    updatedAt: "2026-09-03T12:20:00",
  },
  {
    id: "article-14",
    title:
      "Nie można zapisać zmian w konfiguracji planu lekcji po wprowadzeniu nowych ustawień użytkownika",
    status: "APPROVED",
    importantMarker: "star",
    product: "product-synergia",
    category: "category-schedule",
    tags: ["schedule", "configuration", "error"],
    createdAt: "2026-08-28T09:00:00",
    updatedAt: "2026-09-02T16:10:00",
  },
  {
    id: "article-15",
    title:
      "Diagnostyka problemów z wysyłaniem wiadomości: przeglądarka, sesja użytkownika, uprawnienia i konfiguracja konta",
    status: "APPROVED",
    importantMarker: null,
    product: "product-synergia",
    category: "category-messages",
    tags: ["messages", "error", "browser", "account", "configuration"],
    createdAt: "2026-08-25T10:00:00",
    updatedAt: "2026-09-01T13:40:00",
  },
];
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
    label: "Do weryfikacji",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  APPROVED: {
    label: "Zweryfikowany",
    className: "bg-success/10 text-success border-success/20",
  },
  REJECTED: {
    label: "Odrzucony",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  ARCHIVED: {
    label: "Zarchiwizowany",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const getProductName = (id: string) =>
  mockProducts.find((product) => product.id === id)?.name ?? "Nieznany produkt";

const getCategoryName = (id: string) =>
  mockCategories.find((category) => category.id === id)?.name ??
  "Nieznana kategoria";

const getTagName = (id: string) =>
  mockTags.find((tag) => tag.id === id)?.name ?? id;

export function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...mockArticles]
      .filter((article) => {
        if (!normalizedSearch) {
          return true;
        }

        const searchableText = [
          article.title,
          getProductName(article.product),
          getCategoryName(article.category),
          ...article.tags.map(getTagName),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      })
      .filter((article) => {
        if (statusFilter === "all") {
          return true;
        }

        return article.status === statusFilter;
      })
      .filter((article) => {
        if (productFilter === "all") {
          return true;
        }

        return article.product === productFilter;
      })
      .filter((article) => {
        if (categoryFilter === "all") {
          return true;
        }

        return article.category === categoryFilter;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [search, statusFilter, productFilter, categoryFilter]);

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
            Artykuły i gotowe odpowiedzi dla pomocy technicznej.
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

              {mockProducts.map((product) => (
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

              {mockCategories.map((category) => (
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
          filteredArticles.map((article) => {
            const isImportant = article.importantMarker === "star";

            const visibleTags: string[] = [];
            let hiddenCount = 0;
            let currentLength = 0;

            for (let i = 0; i < article.tags.length; i++) {
              const tag = `#${getTagName(article.tags[i])}`;

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

            const status = statusConfig[article.status];

            return (
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
                          {getProductName(article.product)}
                        </span>

                        <span className="shrink-0 text-[10px] text-border">
                          /
                        </span>

                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {getCategoryName(article.category)}
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
            );
          })
        )}
      </div>
    </div>
  );
}
