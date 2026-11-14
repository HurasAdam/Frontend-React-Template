/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ArticleBreadcrumbsProps {
  productName?: string;
  articleTitle?: string;
  onBack: () => void;
}

export function ArticlePageBreadcrumbs({
  productName,
  articleTitle,
  onBack,
}: ArticleBreadcrumbsProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        aria-label="Wróć do poprzedniej strony"
        onClick={onBack}
      >
        <ArrowLeft />
        Powrót
      </Button>

      <nav
        aria-label="Okruszki"
        className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        <span className="shrink-0">Baza wiedzy</span>

        <span aria-hidden="true">/</span>

        <span className="max-w-[180px] truncate sm:max-w-[240px]">
          {productName ?? "Produkt"}
        </span>

        <span aria-hidden="true">/</span>

        <span
          className="min-w-0 break-words font-medium text-foreground"
          title={articleTitle ?? "Artykuł"}
        >
          {articleTitle ?? "Artykuł"}
        </span>
      </nav>
    </div>
  );
}
