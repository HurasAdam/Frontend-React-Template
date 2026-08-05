import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFindWorkspaceArticlesByFolderQuery } from "../../../../../../hooks/workspace-articles/queries/use-workspace-articles.queries";
import { ARTICLE_MARKERS } from "../../new-article/forms/NewWorkspaceArticleForm";

export function FolderPage() {
  const navigate = useNavigate();

  const { folderId } = useParams();
  const { workspace } = useOutletContext();
  const { data: articles = [] } = useFindWorkspaceArticlesByFolderQuery(
    workspace.id,
    folderId,
  );

  const getMarkerColor = (marker: string | null) => {
    return (
      ARTICLE_MARKERS.find((item) => item.value === marker)?.color ?? "bg-muted"
    );
  };

  const handleOpenArticle = (articleId: string) => {
    navigate(`/workspace/${workspace.id}/articles/${articleId}`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                size-11
                items-center
                justify-center
                rounded-xl
                bg-primary/10
              "
            >
              <FolderOpen className="size-5 text-primary" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight">
                  Dokumentacja techniczna
                </h1>

                <Badge variant="secondary">24</Badge>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Instrukcje konfiguracji systemu oraz materiały dla
                administratorów.
              </p>
            </div>
          </div>

          <Button className="gap-2 rounded-xl">
            <Plus className="size-4" />
            Nowy artykuł
          </Button>
        </div>
      </section>

      {/* SEARCH */}
      <section className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="
              absolute
              left-3
              top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            placeholder="Szukaj artykułu..."
            className="
              h-11
              rounded-xl
              border-muted
              bg-card
              pl-10
            "
          />
        </div>

        <Button variant="outline" className="h-11 gap-2 rounded-xl">
          <SlidersHorizontal className="size-4" />
          Filtry
        </Button>
      </section>

      {/* ARTICLE LIST */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-card
        "
      >
        {articles.map((article) => (
          <button
            onClick={() => handleOpenArticle(article.id)}
            key={article.id}
            className="
              group
              grid
              w-full
              grid-cols-[20px_1fr_40px]
              items-center
              gap-3
              border-b
              border-border/60
              px-6
              py-4
              text-left
              transition-colors
              last:border-none
              hover:bg-muted/40
            "
          >
            {/* LABEL COLOR */}
            <span
              className={`
    size-2.5
    rounded-full
    ${getMarkerColor(article.marker)}
  `}
            />

            {/* TITLE */}
            <div className="min-w-0">
              <span
                className="
                  block
                  truncate
                  text-sm
                  font-medium
                  tracking-tight
                  transition-colors
                  group-hover:text-primary
                "
              >
                {article.title}
              </span>
            </div>

            {/* ACTION */}
            <Button
              variant="ghost"
              size="icon"
              className="
                size-8
                rounded-lg
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </button>
        ))}
      </section>
    </div>
  );
}
