import { cn } from "@/lib/utils";
import {
  CalendarDays,
  FileText,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";

type ArticleLabel = "important";
type ArticleFilter = ArticleLabel | "new" | "all";

type Folder = {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
};

type Article = {
  id: string;
  title: string;
  label: ArticleLabel | null;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
};

const NEW_ARTICLE_DAYS = 3;

const articleTypeLabels: Record<
  ArticleLabel,
  {
    label: string;
    icon: typeof Star;
    color: string;
  }
> = {
  important: {
    label: "Ważne",
    icon: Star,
    color: "text-amber-500",
  },
};

const newArticleConfig = {
  label: "Nowe",
  icon: Sparkles,
  color: "text-blue-500",
};

function isNewArticle(dateString: string) {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();

  const diffMs = now - createdAt;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= NEW_ARTICLE_DAYS;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRelativeDate(dateString: string) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs < 0) {
    return createdAt.toLocaleDateString("pl-PL");
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "przed chwilą";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min temu`;
  }

  if (diffHours < 24) {
    return `${diffHours} godz. temu`;
  }

  if (diffDays === 1) {
    return "wczoraj";
  }

  if (diffDays < 7) {
    return `${diffDays} dni temu`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);

    return `${weeks} ${weeks === 1 ? "tydzień" : "tygodnie"} temu`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);

    return `${months} ${months === 1 ? "miesiąc" : "miesięcy"} temu`;
  }

  return createdAt.toLocaleDateString("pl-PL");
}

function ArticleRow({
  article,
  workspaceId,
}: {
  article: Article;
  workspaceId: string;
}) {
  const isNew = isNewArticle(article.createdAt);

  const labelConfig = isNew
    ? newArticleConfig
    : article.label
      ? articleTypeLabels[article.label]
      : null;

  const LabelIcon = labelConfig?.icon ?? FileText;

  return (
    <Link
      to={`/workspace/${workspaceId}/articles/${article.id}`}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card",
        "px-4 py-3.5",
        "transition-all duration-150",
        "hover:border-border/80 hover:bg-accent/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          "bg-muted text-muted-foreground",
          "transition-colors",
          "group-hover:bg-accent",
        )}
      >
        <LabelIcon
          className={cn(
            "size-4",
            labelConfig?.color ?? "text-muted-foreground",
          )}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {article.title}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Dodano {formatRelativeDate(article.createdAt)}
        </p>
      </div>

      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "group-hover:bg-accent group-hover:text-foreground",
        )}
        aria-hidden="true"
      >
        <MoreHorizontal className="size-4" />
      </div>
    </Link>
  );
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Wyszukaj szablon..."
          className={cn(
            "h-10 w-full rounded-lg border border-border bg-background",
            "pl-9 pr-3 text-sm text-foreground",
            "outline-none transition-colors",
            "placeholder:text-muted-foreground",
            "focus:border-ring focus:ring-2 focus:ring-ring/20",
          )}
        />
      </div>
    </div>
  );
}

/**
 * Osobna sekcja na same informacje o folderze:
 * ikona + nazwa + typ + menu.
 */
function FolderHeader({ folder }: { folder: Folder }) {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                "bg-muted text-muted-foreground",
              )}
            >
              <Folder className="size-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">
                {folder.name}
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">Folder</p>
            </div>
          </div>

          <button
            type="button"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              "text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            )}
            aria-label="Opcje folderu"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * Osobna sekcja z opisem i informacjami o folderze.
 */
function FolderDetails({
  folder,
  articleCount,
}: {
  folder: Folder;
  articleCount: number;
}) {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="space-y-6 p-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Opis folderu
          </p>

          <p className="mt-1.5 text-sm leading-6 text-foreground">
            {folder.description || "Brak opisu folderu."}
          </p>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-start gap-2.5">
            <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Liczba szablonów</p>

              <p className="mt-0.5 text-sm font-medium text-foreground">
                {articleCount}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Utworzono</p>

              <p className="mt-0.5 text-sm font-medium text-foreground">
                {formatDate(folder.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FolderHeaderSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="size-10 animate-pulse rounded-lg bg-muted" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>

          <div className="size-8 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </aside>
  );
}

function FolderDetailsSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="space-y-6 p-5">
        <div className="space-y-2">
          <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex items-center gap-3">
            <div className="size-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterBar({
  articles,
  selectedFilter,
  onSelectedFilterChange,
}: {
  articles: Article[];
  selectedFilter: ArticleFilter;
  onSelectedFilterChange: (value: ArticleFilter) => void;
}) {
  const newCount = articles.filter((article) =>
    isNewArticle(article.createdAt),
  ).length;

  const filterItems: {
    value: ArticleFilter;
    label: string;
    icon: typeof FileText;
    color?: string;
    count: number;
  }[] = [
    {
      value: "all",
      label: "Wszystkie",
      icon: FileText,
      count: articles.length,
    },
    {
      value: "new",
      label: "Nowe",
      icon: newArticleConfig.icon,
      color: newArticleConfig.color,
      count: newCount,
    },
    {
      value: "important",
      label: articleTypeLabels.important.label,
      icon: articleTypeLabels.important.icon,
      color: articleTypeLabels.important.color,
      count: articles.filter((article) => article.label === "important").length,
    },
  ];

  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">Filtry</h2>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Filtruj wpisy według etykiety
        </p>
      </div>

      <div className="space-y-1 p-2">
        {filterItems.map(({ value, label, icon: Icon, color, count }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelectedFilterChange(value)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2",
              "text-left text-sm transition-colors",
              selectedFilter === value
                ? "bg-accent font-medium text-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md",
                "bg-muted",
              )}
            >
              <Icon
                className={cn("size-3.5", color ?? "text-muted-foreground")}
              />
            </div>

            <span>{label}</span>

            <span className="ml-auto text-xs tabular-nums text-muted-foreground">
              {count}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function FilterBarSkeleton() {
  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3.5">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-40 animate-pulse rounded bg-muted" />
      </div>

      <div className="space-y-1 p-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
          >
            <div className="size-7 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="ml-auto h-3 w-5 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </aside>
  );
}

function ArticleRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      <div className="size-9 shrink-0 animate-pulse rounded-lg bg-muted" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
      </div>

      <div className="size-8 shrink-0 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}

export function FolderPage({
  workspaceId,
  folder,
  articles,
  isLoading,
  navigate,
}: {
  workspaceId: string;
  folder?: Folder;
  articles: Article[];
  isLoading: boolean;
  navigate: any;
}) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<ArticleFilter>("all");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        !query || article.title.toLowerCase().includes(query);

      let matchesFilter = true;

      if (selectedFilter === "new") {
        matchesFilter = isNewArticle(article.createdAt);
      }

      if (selectedFilter === "important") {
        matchesFilter = article.label === "important";
      }

      return matchesSearch && matchesFilter;
    });
  }, [articles, search, selectedFilter]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="min-w-0">
          <div className="sticky top-20 space-y-4">
            {isLoading ? (
              <FolderHeaderSkeleton />
            ) : folder ? (
              <FolderHeader folder={folder} />
            ) : null}

            <SearchBox value={search} onChange={setSearch} />

            {isLoading ? (
              <FolderDetailsSkeleton />
            ) : folder ? (
              <FolderDetails folder={folder} articleCount={articles.length} />
            ) : null}

            {isLoading ? (
              <FilterBarSkeleton />
            ) : folder ? (
              <FilterBar
                articles={articles}
                selectedFilter={selectedFilter}
                onSelectedFilterChange={setSelectedFilter}
              />
            ) : null}
          </div>
        </aside>

        {/* Articles */}
        <main className="min-w-0">
          <div className="mb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-foreground">
                  Szablony odpowiedzi
                </h1>

                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedFilter === "all"
                    ? `${articles.length} ${
                        articles.length === 1 ? "szablon" : "szablonów"
                      } w tym folderze`
                    : `${filteredArticles.length} z ${articles.length} ${
                        articles.length === 1 ? "szablonu" : "szablonów"
                      }`}
                </p>
              </div>

              <Button
                type="button"
                onClick={() =>
                  navigate(`/workspace/${workspaceId}/articles/new`)
                }
                className="shrink-0"
              >
                <Plus className="size-4" />
                Nowy artykuł
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleRowSkeleton key={index} />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-2">
              {filteredArticles.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  workspaceId={workspaceId}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
              <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Search className="size-5" />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-foreground">
                Nie znaleziono szablonów
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Spróbuj zmienić wyszukiwanie lub wybrany filtr.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
