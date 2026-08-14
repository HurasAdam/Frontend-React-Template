// components/article/ArticleDetailView.tsx

import * as LucideIcons from "lucide-react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Hash,
  Layers3,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface ArticleVariant {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
}

export interface WorkspaceArticle {
  id: string;
  title: string;
  marker: string;
  folder: {
    id: string;
    name: string;
  };
  workspace: {
    id: string;
    name: string;
    labelColor: string;
    iconKey: string;
  };
  variants: ArticleVariant[];
  createdAt: string;
}

interface ArticleDetailViewProps {
  article: WorkspaceArticle;
  onBack?: () => void;
  onEditArticle?: (article: WorkspaceArticle) => void;
  onDeleteArticle?: (article: WorkspaceArticle) => void;
  onCreateVariant?: (article: WorkspaceArticle) => void;
  onEditVariant?: (variant: ArticleVariant, article: WorkspaceArticle) => void;
}

const markerConfig: Record<
  string,
  {
    label: string;
    dotClassName: string;
    badgeClassName: string;
  }
> = {
  green: {
    label: "Gotowy",
    dotClassName: "bg-emerald-500",
    badgeClassName:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  amber: {
    label: "W trakcie",
    dotClassName: "bg-amber-500",
    badgeClassName:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  red: {
    label: "Do poprawy",
    dotClassName: "bg-red-500",
    badgeClassName:
      "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  },
  blue: {
    label: "Do przeglądu",
    dotClassName: "bg-blue-500",
    badgeClassName:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
};

export function ArticleDetailView({
  article,
  onBack,
  onEditArticle,
  onDeleteArticle,
  onCreateVariant,
  onEditVariant,
}: ArticleDetailViewProps) {
  const variants = useMemo(
    () => [...article.variants].sort((a, b) => a.order - b.order),
    [article.variants],
  );

  const [activeVariantId, setActiveVariantId] = useState(
    variants[0]?.id ?? null,
  );

  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  useEffect(() => {
    const activeVariantExists = variants.some(
      (variant) => variant.id === activeVariantId,
    );

    if (!activeVariantExists) {
      setActiveVariantId(variants[0]?.id ?? null);
    }
  }, [activeVariantId, variants]);

  const activeVariant =
    variants.find((variant) => variant.id === activeVariantId) ??
    variants[0] ??
    null;

  const marker = markerConfig[article.marker] ?? {
    label: article.marker || "Bez statusu",
    dotClassName: "bg-muted-foreground",
    badgeClassName: "border-border bg-muted text-muted-foreground",
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(key);

      window.setTimeout(() => {
        setCopiedValue((currentValue) =>
          currentValue === key ? null : currentValue,
        );
      }, 1600);
    } catch {
      setCopiedValue(null);
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full ">
        <div className="flex flex-wrap items-center gap-3">
          {onBack ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="-ml-2 gap-2 text-muted-foreground"
              onClick={onBack}
            >
              <ArrowLeft className="size-4" />
              Wróć
            </Button>
          ) : null}
        </div>

        <header className=" flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h1 className="mt-3 break-words text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {formatDate(article.createdAt)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Layers3 className="size-4" />
                {formatVariantCount(variants.length)}
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors hover:text-foreground"
                onClick={() => handleCopy("article-id", article.id)}
              >
                <Hash className="size-3.5" />
                <span>{article.id}</span>

                {copiedValue === "article-id" ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onEditArticle ? (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => onEditArticle(article)}
              >
                <Pencil className="size-4" />
                Edytuj
              </Button>
            ) : null}

            {onCreateVariant ? (
              <Button
                type="button"
                className="gap-2"
                onClick={() => onCreateVariant(article)}
              >
                <Plus className="size-4" />
                Nowy wariant
              </Button>
            ) : null}

            {onDeleteArticle ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Więcej akcji"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDeleteArticle(article)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Usuń artykuł
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </header>

        <Separator className="my-8" />

        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase text-muted-foreground">
                Warianty
              </h2>

              <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {variants.length}
              </span>
            </div>

            <div className="space-y-2">
              {variants.map((variant) => {
                const isActive = variant.id === activeVariant?.id;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveVariantId(variant.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors",
                      isActive
                        ? "border-primary/30 bg-primary/5 text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {variant.order + 1}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {variant.variantName}
                      </span>

                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {variant.variantContent.length} znaków
                      </span>
                    </span>

                    <ChevronRight
                      className={cn(
                        "size-4 shrink-0 transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                );
              })}

              {onCreateVariant ? (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start gap-2 border-dashed text-muted-foreground"
                  onClick={() => onCreateVariant(article)}
                >
                  <Plus className="size-4" />
                  Dodaj wariant
                </Button>
              ) : null}
            </div>

            <dl className="mt-6 space-y-4 rounded-md border bg-card p-4 text-sm">
              <MetadataRow
                label="Workspace"
                value={
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: article.workspace.labelColor,
                      }}
                    />
                    <span className="truncate">{article.workspace.name}</span>
                  </span>
                }
              />

              <MetadataRow label="Folder" value={article.folder.name} />

              <MetadataRow
                label="Status"
                value={
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={cn("size-2 rounded-full", marker.dotClassName)}
                    />
                    {marker.label}
                  </span>
                }
              />
            </dl>
          </aside>

          <section className="flex min-h-[460px] min-w-0 flex-col overflow-hidden rounded-md border bg-card">
            {activeVariant ? (
              <>
                <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-card-foreground">
                      {activeVariant.variantName}
                    </h2>

                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      {activeVariant.id}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() =>
                        handleCopy(
                          `variant-${activeVariant.id}`,
                          activeVariant.variantContent,
                        )
                      }
                    >
                      {copiedValue === `variant-${activeVariant.id}` ? (
                        <>
                          <Check className="size-4 text-emerald-500" />
                          Skopiowano
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          Kopiuj
                        </>
                      )}
                    </Button>

                    {onEditVariant ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => onEditVariant(activeVariant, article)}
                      >
                        <Pencil className="size-4" />
                        Edytuj
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div className="flex-1 px-5 py-6 sm:px-7 sm:py-8">
                  {activeVariant.variantContent.trim() ? (
                    <article className="whitespace-pre-wrap break-words text-[15px] leading-7 text-card-foreground">
                      {activeVariant.variantContent}
                    </article>
                  ) : (
                    <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                      <div className="flex size-12 items-center justify-center rounded-md bg-muted">
                        <FileText className="size-5 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-medium">
                        Ten wariant jest pusty
                      </h3>

                      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        Dodaj treść, aby rozpocząć pracę nad tym wariantem.
                      </p>

                      {onEditVariant ? (
                        <Button
                          type="button"
                          size="sm"
                          className="mt-4 gap-2"
                          onClick={() => onEditVariant(activeVariant, article)}
                        >
                          <Pencil className="size-4" />
                          Dodaj treść
                        </Button>
                      ) : null}
                    </div>
                  )}
                </div>

                <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t bg-muted/30 px-5 py-3 text-xs text-muted-foreground">
                  <span>{activeVariant.variantContent.length} znaków</span>

                  <span>{formatWordCount(activeVariant.variantContent)}</span>

                  <span className="sm:ml-auto">
                    Pozycja {activeVariant.order + 1}
                  </span>
                </footer>
              </>
            ) : (
              <EmptyVariants
                onCreate={
                  onCreateVariant ? () => onCreateVariant(article) : undefined
                }
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function WorkspaceBadge({
  workspace,
}: {
  workspace: WorkspaceArticle["workspace"];
}) {
  const icons = LucideIcons as unknown as Record<
    string,
    ComponentType<{ className?: string }>
  >;

  const WorkspaceIcon = icons[workspace.iconKey] ?? LucideIcons.Boxes;

  return (
    <span
      className="inline-flex max-w-56 items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium"
      style={{
        borderColor: `${workspace.labelColor}35`,
        backgroundColor: `${workspace.labelColor}12`,
        color: workspace.labelColor,
      }}
    >
      <WorkspaceIcon className="size-3.5 shrink-0" />
      <span className="truncate">{workspace.name}</span>
    </span>
  );
}

function MetadataRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 truncate text-right font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}

function EmptyVariants({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="flex min-h-[460px] flex-col items-center justify-center px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-md bg-muted">
        <FileText className="size-6 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">Brak wariantów</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Ten artykuł nie posiada jeszcze żadnego wariantu treści.
      </p>

      {onCreate ? (
        <Button type="button" className="mt-5 gap-2" onClick={onCreate}>
          <Plus className="size-4" />
          Utwórz pierwszy wariant
        </Button>
      ) : null}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatVariantCount(count: number) {
  if (count === 1) {
    return "1 wariant";
  }

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return `${count} warianty`;
  }

  return `${count} wariantów`;
}

function formatWordCount(content: string) {
  const count = content.trim() ? content.trim().split(/\s+/).length : 0;

  if (count === 1) {
    return "1 słowo";
  }

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return `${count} słowa`;
  }

  return `${count} słów`;
}
