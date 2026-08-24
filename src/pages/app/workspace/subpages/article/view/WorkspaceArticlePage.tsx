import {
  Calendar,
  Check,
  Copy,
  Folder,
  Hash,
  Rocket,
  Type,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Article = {
  id: string;
  title: string;
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

function ContentBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/);

  return (
    <div className="space-y-5 text-[15px] leading-[1.75] text-foreground/85">
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
        {[1].map((i) => (
          <article
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
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
        ))}
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
}: {
  variant: Article["variants"][number];
  index: number;
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            {index + 1}
          </span>

          <h2 className="text-sm font-semibold text-foreground">
            {variant.variantName}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground sm:inline-flex">
            <Type className="size-3.5" />
            {wordCount} słów · {charCount} znaków
          </span>

          <Button size="sm" className="gap-2" onClick={handleCopy}>
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}

            {copied ? "Skopiowano" : "Kopiuj szablon"}
          </Button>
        </div>
      </div>

      <div className="px-6 py-7 md:px-8 md:py-9">
        <ContentBody content={variant.variantContent} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/40 px-6 py-4 md:px-8">
        <p className="text-xs text-muted-foreground">
          Przed wysłaniem dostosuj zwroty grzecznościowe do odbiorcy.
        </p>
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

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_0.45fr]">
      {/* Left */}
      <div className="space-y-6">
        {sortedVariants.map((variant, index) => (
          <VariantCard key={variant.id} variant={variant} index={index} />
        ))}
      </div>

      {/* Right */}
      <aside className="space-y-6 lg:sticky lg:top-8">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border px-5 py-3.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Informacje
            </h2>
          </div>

          <div className="divide-y divide-border px-5">
            <MetaRow icon={Folder} label="Folder">
              {article.folder.name}
            </MetaRow>

            <MetaRow icon={Rocket} label="Etykieta">
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: article.workspace.labelColor,
                  }}
                  aria-hidden
                />

                {article.workspace.name}
              </span>
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
      </aside>
    </div>
  );
}
