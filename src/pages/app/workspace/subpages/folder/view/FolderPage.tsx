import { ArrowRight, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatRelativeDate } from "@/lib/utils";
import { useFindWorkspaceArticlesByFolderQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";

export interface WorkspaceArticle {
  id: string;
  title: string;
  marker: string | null;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
}

export interface WorkspaceFolder {
  id: string;
  name: string;
  description?: string;
  articleCount?: number;
}

interface FolderArticlesListProps {
  folder?: WorkspaceFolder;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onNewArticle?: () => void;
}

const MOCK_FOLDER: WorkspaceFolder = {
  id: "folder-mock-1",
  name: "Dokumentacja techniczna",
  description:
    "Instrukcje konfiguracji systemu oraz materiały dla administratorów.",
  articleCount: 10,
};

function ArticleSkeleton() {
  return (
    <div className="flex min-h-[76px] items-center gap-4 border-b border-border/50 px-5 py-3.5">
      <div className="size-8 shrink-0 animate-pulse rounded-md bg-muted" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
      </div>

      <div className="size-8 shrink-0 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

function EmptyState({
  hasSearch,
  onNewArticle,
}: {
  hasSearch: boolean;
  onNewArticle?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <h3 className="text-sm font-semibold text-foreground">
        {hasSearch ? "Nie znaleziono artykułów" : "Brak artykułów"}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs leading-5 text-muted-foreground">
        {hasSearch
          ? "Spróbuj zmienić frazę wyszukiwania."
          : "W tym folderze nie ma jeszcze żadnych artykułów. Dodaj pierwszy, aby rozpocząć."}
      </p>

      {!hasSearch && onNewArticle && (
        <Button size="sm" className="mt-5 gap-1.5" onClick={onNewArticle}>
          <Plus className="size-4" />
          Nowy artykuł
        </Button>
      )}
    </div>
  );
}

export function FolderPage({
  folder: folderProp,
  searchQuery: searchQueryProp,
  onSearchChange,
  onNewArticle,
}: FolderArticlesListProps) {
  const { workspace } = useOutletContext();
  const { folderId } = useParams();

  const { data: articles = [], isLoading } =
    useFindWorkspaceArticlesByFolderQuery(workspace.id, folderId);

  const [internalSearch, setInternalSearch] = useState("");

  const folder = folderProp ?? MOCK_FOLDER;

  const isControlledSearch =
    searchQueryProp !== undefined && onSearchChange !== undefined;

  const searchQuery = isControlledSearch ? searchQueryProp : internalSearch;

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    const titleMatches = article.title.toLowerCase().includes(query);

    const authorMatches =
      article.createdBy &&
      `${article.createdBy.name} ${article.createdBy.surname}`
        .toLowerCase()
        .includes(query);

    return titleMatches || authorMatches;
  });

  const articleCount = articles.length;
  const hasSearch = searchQuery.trim().length > 0;

  const handleSearchChange = (value: string) => {
    if (isControlledSearch) {
      onSearchChange?.(value);
    } else {
      setInternalSearch(value);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <header className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          {/* Title */}
          <div className="mt-3 flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <FileText className="size-4 text-primary" />
            </div>

            <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-[28px]">
              {folder.name}
            </h1>

            <Badge
              variant="secondary"
              className="shrink-0 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
            >
              {articleCount} {articleCount === 1 ? "artykuł" : "artykułów"}
            </Badge>
          </div>

          {folder.description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:ml-12">
              {folder.description}
            </p>
          )}
        </div>

        <Button onClick={onNewArticle} size="sm" className="shrink-0 gap-1.5">
          <Plus className="size-4" />
          Nowy artykuł
        </Button>
      </header>

      {/* Search */}
      <section aria-label="Wyszukiwanie artykułów" className="mt-6">
        <div className="flex items-center rounded-xl border border-border/60 bg-card/60 p-1.5">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Szukaj artykułów..."
              className="h-9 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </section>

      {/* List meta */}
      <div className="px-1.5 pb-2 pt-6">
        <span className="text-xs font-medium text-muted-foreground">
          {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "artykuł" : "artykułów"}
        </span>
      </div>

      {/* Article list */}
      <section className="rounded-xl border border-border/60 bg-card/60">
        {isLoading ? (
          <>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </>
        ) : filteredArticles.length === 0 ? (
          <EmptyState hasSearch={hasSearch} onNewArticle={onNewArticle} />
        ) : (
          <ul role="list">
            {filteredArticles.map((article) => (
              <li key={article.id}>
                <Link
                  to={`/workspace/${workspace.id}/articles/${article.id}`}
                  className={cn(
                    "group flex min-h-[76px] cursor-pointer items-center gap-4",
                    "border-b border-border/50 px-5 py-3.5 last:border-b-0",
                    "transition-colors duration-150",
                    "hover:bg-muted/35",
                    "focus-visible:bg-muted/35 focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50",
                  )}
                >
                  {/* Document icon */}
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30">
                    <FileText className="size-4 text-muted-foreground group-hover:text-foreground" />
                  </div>

                  {/* Article content */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold tracking-[-0.01em] text-foreground">
                      {article.title}
                    </h2>

                    {(article.createdAt || article.createdBy) && (
                      <div className="mt-1.5 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                        {article.createdAt && (
                          <span className="truncate">
                            Dodany {formatRelativeDate(article.createdAt)}
                          </span>
                        )}

                        {article.createdAt && article.createdBy && (
                          <span
                            aria-hidden="true"
                            className="size-1 shrink-0 rounded-full bg-muted-foreground/50"
                          />
                        )}

                        {article.createdBy && (
                          <div className="truncate space-x-0.5">
                            <span>autor: {article.createdBy.name}</span>
                            <span> {article.createdBy.surname}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Open article */}
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-md",
                      "text-muted-foreground hover:bg-muted hover:text-foreground",
                      "opacity-0 transition-opacity duration-150",
                      "group-hover:opacity-100",
                      "sm:opacity-100",
                    )}
                  >
                    <ArrowRight className="size-4" />
                    <span className="sr-only">Otwórz artykuł</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer */}
      {!isLoading && filteredArticles.length > 0 && (
        <footer className="flex flex-col gap-2 px-1.5 py-4 text-[11px] text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Wszystkie zmiany zapisane
          </span>

          <span>Ostatnia synchronizacja: przed chwilą</span>
        </footer>
      )}
    </div>
  );
}
