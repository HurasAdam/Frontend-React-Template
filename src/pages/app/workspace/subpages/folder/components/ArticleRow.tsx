import { FileText, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../../../../lib/utils";
import type { IFolderArticle } from "../../../../../../services/workspace-articles/types";
import {
  articleTypeLabels,
  formatRelativeDate,
  isNewArticle,
  newArticleConfig,
} from "../utils";

export function ArticleRow({
  article,
  workspaceId,
}: {
  article: IFolderArticle;
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
