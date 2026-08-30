import { FileText } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import type { IFolderArticle } from "../../../../../../services/workspace-articles/types";
import {
  articleTypeLabels,
  isNewArticle,
  newArticleConfig,
  type ArticleFilter,
} from "../utils";

export function FilterBar({
  articles,
  selectedFilter,
  onSelectedFilterChange,
}: {
  articles: IFolderArticle[];
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
