import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";
import type {
  IFolderArticle,
  IFolderDetails,
} from "../../../../../../services/workspace-articles/types";
import { ArticleRow } from "../components/ArticleRow";
import { ArticleRowSkeleton } from "../components/ArticleRowSkeleton";
import { FilterBar } from "../components/FilterBarSection";
import { FilterBarSectionSkeleton } from "../components/FilterBarSectionSkeleton";
import { FolderDetailsSection } from "../components/FolderDetailsSection";
import { FolderDetailsSectionSkeleton } from "../components/FolderDetailsSectionSkeleton";
import { HeaderSection } from "../components/HeaderSection";
import { HeaderSectionSkeleton } from "../components/HeaderSectionSkeleton";
import { SearchBoxSection } from "../components/SearchBoxSection";
import { isNewArticle } from "../utils";

type ArticleLabel = "important";
type ArticleFilter = ArticleLabel | "new" | "all";

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

export function FolderPage({
  workspaceId,
  folder,
  articles,
  isLoading,
}: {
  workspaceId: string;
  folder?: IFolderDetails;
  articles: IFolderArticle[];
  isLoading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<ArticleFilter>("all");
  const navigate = useNavigate();

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
              <HeaderSectionSkeleton />
            ) : folder ? (
              <HeaderSection folder={folder} />
            ) : null}

            <SearchBoxSection value={search} onChange={setSearch} />

            {isLoading ? (
              <FolderDetailsSectionSkeleton />
            ) : folder ? (
              <FolderDetailsSection
                folder={folder}
                articleCount={articles.length}
              />
            ) : null}

            {isLoading ? (
              <FilterBarSectionSkeleton />
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
