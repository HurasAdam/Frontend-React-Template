import {
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Folder,
  Hash,
  MoreHorizontal,
  Newspaper,
  Pencil,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../components/ui/dropdown-menu";
import PageHeader from "../../settings/components/PageHeader";
import ArticleModalsSection from "../components/ArticleModalsSection";
import ResponseVariantModalsSection from "../components/ResponseVariantModalsSection";
import { useArticleModal } from "../hooks/useArticleModal";
import { useResponseVariantModal } from "../hooks/useResponseVariantModal";

type ArticleLabel = "popular";

type Article = {
  id: string;
  title: string;
  label: ArticleLabel | null;
  createdAt: string;

  createdBy: {
    id: string;
    name: string;
    surname: string;
  };

  folder: {
    id: string;
    name: string;
  };

  workspace: {
    id: string;
    name: string;
    labelColor: string;
  };

  variants: {
    id: string;
    variantName: string;
    variantContent: string;
    order: number;
  }[];
};

type WorkspaceArticlePageProps = {
  article: Article | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const NEW_ARTICLE_DAYS = 3;

const articleLabelConfig: Record<
  ArticleLabel,
  {
    label: string;
    icon: typeof Rocket;
    color: string;
  }
> = {
  popular: {
    label: "Ważne",
    icon: Rocket,
    color: "text-amber-500",
  },
};

const newArticleConfig = {
  label: "Nowy wpis",
  icon: Sparkles,
  color: "text-blue-500",
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Warsaw",
});

function formatDate(iso: string) {
  const date = new Date(iso);

  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

function isNewArticle(dateString: string) {
  const createdAt = new Date(dateString).getTime();
  const now = Date.now();

  const diffMs = now - createdAt;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= NEW_ARTICLE_DAYS;
}

function getArticleLabel(article: Article) {
  if (isNewArticle(article.createdAt)) {
    return newArticleConfig;
  }

  if (article.label) {
    return articleLabelConfig[article.label];
  }

  return null;
}

function ContentBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/);

  return (
    <div className="space-y-5 text-[14.5px] leading-[1.75] text-foreground/85">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-wrap break-words">
          {paragraph.split(/(https?:\/\/\S+)/g).map((chunk, j) =>
            /^https?:\/\//.test(chunk) ? (
              <a
                key={j}
                href={chunk}
                target="_blank"
                rel="noreferrer noopener"
                className="break-all font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                {chunk}
              </a>
            ) : (
              <span key={j}>{chunk}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
          {label}
        </p>

        <div className="mt-1 text-sm font-medium text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_0.45fr]">
      <div className="space-y-6">
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 md:px-8">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="space-y-4 px-6 py-7 md:px-8 md:py-9">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          </div>
        </article>
      </div>

      <aside className="space-y-6">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border px-5 py-3.5">
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
          </div>

          <div className="space-y-1.5 p-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function ArticleError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <h1 className="text-xl font-semibold text-foreground">
          Nie udało się wczytać artykułu
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Wystąpił błąd podczas pobierania danych. Spróbuj ponownie za chwilę.
        </p>

        <Button onClick={onRetry} className="mt-6">
          Spróbuj ponownie
        </Button>
      </div>
    </div>
  );
}

function VariantCard({
  variant,
  index,
  onEdit,
  onDelete,
}: {
  variant: Article["variants"][number];
  index: number;
  onEdit: (variant: Article["variants"][number]) => void;
  onDelete: (variant: Article["variants"][number]) => void;
}) {
  const [copied, setCopied] = useState(false);

  const wordCount = variant.variantContent.trim().split(/\s+/).length;
  const charCount = variant.variantContent.length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(variant.variantContent);

    setCopied(true);
    toast.success("Treść szablonu skopiowana do schowka");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            {index + 1}
          </span>

          <h2 className="text-sm font-semibold text-foreground">
            {variant.variantName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 h-8"
            onClick={handleCopy}
            aria-label="Kopiuj treść szablonu"
          >
            {copied ? (
              <Check className="size-4 text-emerald-600" />
            ) : (
              <Copy className="size-4" />
            )}

            <span>Kopiuj</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Więcej opcji"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="w-52 rounded-2xl border-border/70 bg-popover p-1.5 shadow-xl"
            >
              <div className="px-3 py-2.5">
                <p className="text-xs font-semibold text-foreground">
                  Zarządzanie wariantem
                </p>

                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Dostępne akcje
                </p>
              </div>

              <DropdownMenuSeparator className="bg-border/60" />

              <DropdownMenuItem
                onClick={() => onEdit(variant)}
                className="cursor-pointer rounded-xl px-2.5 py-2.5"
              >
                <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Pencil className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">Edytuj</p>
                  <p className="text-[11px] text-muted-foreground">
                    Zmień treść wariantu
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-border/60" />

              <DropdownMenuItem
                onClick={() => onDelete(variant)}
                className="cursor-pointer rounded-xl px-2.5 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <Trash2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">Usuń</p>
                  <p className="text-[11px] text-destructive/70">
                    Usuń ten wariant
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-7 md:px-8 md:py-9">
        <ContentBody content={variant.variantContent} />
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-muted/40 px-6 py-3.5 md:px-8">
        <p className="text-xs text-muted-foreground">
          Przed wysłaniem dostosuj zwroty grzecznościowe do odbiorcy.
        </p>

        <div className="shrink-0 text-xs font-medium text-muted-foreground">
          {wordCount} słów · {charCount} znaków
        </div>
      </div>
    </article>
  );
}

export function WorkspaceArticlePage({
  article,
  isLoading,
  isError,
  refetch,
}: WorkspaceArticlePageProps) {
  const articleModal = useArticleModal();
  const responseVariantModal = useResponseVariantModal();

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  if (isError || !article) {
    return <ArticleError onRetry={refetch} />;
  }

  const sortedVariants = [...article.variants].sort(
    (a, b) => a.order - b.order,
  );

  const authorInitials = `${article.createdBy.name.charAt(
    0,
  )}${article.createdBy.surname.charAt(0)}`;

  const articleLabel = getArticleLabel(article);

  const LabelIcon = articleLabel?.icon ?? Rocket;

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_0.45fr]">
      {/* Left */}

      <div className="space-y-6 px-5">
        <div className="">
          <PageHeader
            title={article.title}
            description={` 📁  ${article.folder.name}`}
            icon={Newspaper}
          />
        </div>
        {sortedVariants.map((variant, index) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            index={index}
            onEdit={responseVariantModal.openEdit}
            onDelete={responseVariantModal.openDelete}
          />
        ))}
      </div>

      {/* Right */}
      {/* Right */}
      <aside className="space-y-6 lg:sticky lg:top-8">
        {/* Information */}
        <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 px-5 py-3.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Informacje
            </h2>
          </div>

          <div className="divide-y divide-border px-5">
            <MetaRow icon={Folder} label="Folder">
              {article.folder.name}
            </MetaRow>

            <MetaRow icon={LabelIcon} label="Etykieta">
              {articleLabel ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${articleLabel.color.replace(
                      "text-",
                      "bg-",
                    )}`}
                    aria-hidden
                  />

                  {articleLabel.label}
                </span>
              ) : (
                <span className="text-muted-foreground">Brak etykiety</span>
              )}
            </MetaRow>

            <MetaRow icon={User} label="Autor">
              <span className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {authorInitials}
                </span>

                <span className="truncate">
                  {article.createdBy.name} {article.createdBy.surname}
                </span>
              </span>
            </MetaRow>

            <MetaRow icon={Calendar} label="Data dodania">
              {formatDate(article.createdAt)}
            </MetaRow>

            <MetaRow icon={Hash} label="Identyfikator">
              <code className="break-all font-mono text-xs text-muted-foreground">
                {article.id}
              </code>
            </MetaRow>
          </div>

          <Separator />

          <div className="px-5 py-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Szablon przeznaczony dla zespołu pomocy technicznej. Zmiany treści
              zgłaszaj opiekunowi przestrzeni.
            </p>
          </div>
        </section>

        {/* Actions */}
        <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
          <div className="border-b border-border/70 px-5 py-3.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Akcje
            </h2>
          </div>

          <div className="p-2">
            {/* Add variant */}
            <button
              type="button"
              onClick={() => {
                // TODO: dodanie kolejnej wersji odpowiedzi
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-primary/[0.06]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Plus className="size-4" />
              </span>

              <span
                onClick={() => responseVariantModal.openAdd()}
                className="min-w-0 flex-1"
              >
                <span className="block text-sm font-medium text-foreground">
                  Dodaj wersję odpowiedzi
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Utwórz kolejny wariant odpowiedzi
                </span>
              </span>

              <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </button>

            <div className="mx-3 my-1 border-t border-border/60" />

            {/* Edit article */}
            <button
              type="button"
              onClick={() =>
                articleModal.openEdit({
                  id: article.id,
                  title: article.title,
                  folderId: article.folder.id,
                })
              }
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/70"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-muted/80 group-hover:text-foreground">
                <Pencil className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">
                  Edytuj artykuł
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Zmień tytuł lub folder
                </span>
              </span>

              <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </button>

            <div className="mx-3 my-1 border-t border-border/60" />

            {/* Important */}
            <button
              type="button"
              onClick={() => {
                // TODO: oznaczenie / usunięcie oznaczenia ważności
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-amber-500/[0.06]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500/15">
                <Rocket className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {article.label === "popular"
                    ? "Usuń oznaczenie ważne"
                    : "Oznacz jako ważne"}
                </span>

                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {article.label === "popular"
                    ? "Usuń wyróżnienie artykułu"
                    : "Wyróżnij artykuł jako ważny"}
                </span>
              </span>

              <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </button>
          </div>
        </section>
      </aside>

      <ResponseVariantModalsSection
        isOpen={responseVariantModal.isOpen}
        type={responseVariantModal.type}
        onClose={responseVariantModal.close}
        variant={responseVariantModal.variant}
      />

      <ArticleModalsSection
        type={articleModal.type}
        isOpen={articleModal.isOpen}
        onClose={articleModal.close}
        article={articleModal.article}
      />
    </div>
  );
}
