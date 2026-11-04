/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  History,
  Layers3,
  Pencil,
  Plus,
  Search,
  Send,
  ShieldCheck,
  StickyNote,
  Tag,
  Type,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useFindByArticleQuery } from "../../../../hooks/article-audit-logs/queries/use-article-audit-logs.queries";
import { useFindArticleQuery } from "../../../../hooks/articles/queries/use-articles.queries";
import { ArticleAuditLogEventCard } from "../components/ArticleAuditLogEventCard";
import { ArticleAuditLogDetailsModal } from "../modals/ArticleAuditLogDetailsModal";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type HistoryCategory =
  | "CREATED"
  | "TITLE"
  | "INTERNAL_NOTE"
  | "CONTENT"
  | "VARIANT"
  | "STATUS"
  | "CLASSIFICATION"
  | "VERIFICATION"
  | "PUBLICATION";

type FilterValue = "ALL" | HistoryCategory;

type ArticleAuditLogChange = {
  field: string;
  before: unknown;
  after: unknown;
};

type ArticleAuditLog = {
  id: string;
  articleId: string;
  variantId: string | null;
  eventType: string;
  actor: {
    userId: string;
    name: string;
    surname: string;
    email: string;
  };
  changes: ArticleAuditLogChange[];
  createdAt: string;
};

export type HistoryEntry = {
  id: string;
  category: HistoryCategory;
  title: string;
  description: string;
  actor: {
    name: string;
    initials: string;
    role: string;
  };
  timestamp: string;
  dateLabel: string;
  details: {
    label: string;
    before?: string;
    after?: string;
  }[];
};

// -----------------------------------------------------------------------------
// Event configuration
// -----------------------------------------------------------------------------

const eventConfig: Record<
  string,
  {
    category: HistoryCategory;
    title: string;
    description: string;
  }
> = {
  ARTICLE_CREATED: {
    category: "CREATED",
    title: "Utworzono artykuł",
    description: "Artykuł został dodany do bazy wiedzy.",
  },

  ARTICLE_APPROVED: {
    category: "VERIFICATION",
    title: "Zatwierdzono artykuł",
    description: "Artykuł uzyskał akceptację do publikacji.",
  },

  ARTICLE_PUBLISHED: {
    category: "PUBLICATION",
    title: "Opublikowano artykuł",
    description: "Artykuł został udostępniony użytkownikom bazy wiedzy.",
  },

  ARTICLE_VERIFIED: {
    category: "VERIFICATION",
    title: "Zweryfikowano artykuł",
    description: "Potwierdzono aktualność informacji zawartych w artykule.",
  },

  ARTICLE_TITLE_UPDATED: {
    category: "TITLE",
    title: "Zmieniono tytuł artykułu",
    description: "Zmieniono nazwę artykułu wyświetlaną w bazie wiedzy.",
  },

  ARTICLE_INTERNAL_NOTE_UPDATED: {
    category: "INTERNAL_NOTE",
    title: "Zaktualizowano notatkę wewnętrzną",
    description: "Zmieniono treść notatki wewnętrznej dla pracownika",
  },

  ARTICLE_PRODUCT_UPDATED: {
    category: "CLASSIFICATION",
    title: "Zmieniono produkt artykułu",
    description: "Zaktualizowano powiązanie artykułu z produktem.",
  },

  ARTICLE_CATEGORY_UPDATED: {
    category: "CLASSIFICATION",
    title: "Zmieniono kategorię artykułu",
    description: "Zaktualizowano przypisanie artykułu do kategorii.",
  },

  ARTICLE_TAGS_UPDATED: {
    category: "CLASSIFICATION",
    title: "Zaktualizowano tagi artykułu",
    description: "Zmieniono oznaczenia ułatwiające wyszukiwanie artykułu.",
  },

  VARIANT_CREATED: {
    category: "VARIANT",
    title: "Dodano wariant odpowiedzi",
    description: "Artykuł został rozszerzony o dodatkowy wariant odpowiedzi.",
  },

  VARIANT_NAME_UPDATED: {
    category: "VARIANT",
    title: "Zmieniono nazwę wariantu odpowiedzi",
    description:
      "Zaktualizowano oznaczenie wariantu na liście dostępnych odpowiedzi.",
  },

  VARIANT_CONTENT_UPDATED: {
    category: "VARIANT",
    title: "Zmieniono treść wariantu odpowiedzi",
    description:
      "Zaktualizowano treść wybranego wariantu odpowiedzi dla klienta.",
  },

  VARIANT_DELETED: {
    category: "VARIANT",
    title: "Usunięto wariant odpowiedzi",
    description: "Wariant został usunięty z dostępnych odpowiedzi artykułu.",
  },
};

// -----------------------------------------------------------------------------
// Field labels
// -----------------------------------------------------------------------------

const fieldLabels: Record<string, string> = {
  title: "Tytuł artykułu",
  internalNote: "Notatka wewnętrzna",
  product: "Produkt",
  category: "Kategoria",
  tags: "Tagi",
  reviewStatus: "Status weryfikacji",
  publicationStatus: "Status publikacji",
  verifiedBy: "Osoba weryfikująca",
  lastVerifiedAt: "Data ostatniej weryfikacji",
  variantName: "Nazwa wariantu",
  variantContent: "Treść wariantu",
  order: "Kolejność",
  responseVariant: "Wariant odpowiedzi",
};

// -----------------------------------------------------------------------------
// Status labels
// -----------------------------------------------------------------------------

const statusLabels: Record<string, string> = {
  DRAFT: "Szkic",
  PENDING_REVIEW: "Oczekuje na weryfikację",
  APPROVED: "Zweryfikowany",
  REQUIRES_REVERIFICATION: "Wymaga ponownej weryfikacji",
  CHANGES_REQUESTED: "Wymaga poprawek",
  REJECTED: "Odrzucony",

  UNPUBLISHED: "Nieopublikowany",
  PUBLISHED: "Opublikowany",
  ARCHIVED: "Zarchiwizowany",
};

// -----------------------------------------------------------------------------
// Value formatters
// -----------------------------------------------------------------------------

function formatDateTimeValue(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatAuditValue(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    return statusLabels[value] ?? value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => formatAuditValue(item))
      .filter((item): item is string => Boolean(item))
      .join(", ");
  }

  if (typeof value === "object") {
    const object = value as Record<string, unknown>;

    // Osoba: verifiedBy
    if ("name" in object || "surname" in object) {
      const name = typeof object.name === "string" ? object.name : "";

      const surname = typeof object.surname === "string" ? object.surname : "";

      return [name, surname].filter(Boolean).join(" ");
    }

    // Wariant odpowiedzi: responseVariant
    if ("variantName" in object || "variantContent" in object) {
      const name =
        typeof object.variantName === "string" ? object.variantName : "";

      const content =
        typeof object.variantContent === "string" ? object.variantContent : "";

      return [name ? `Nazwa: ${name}` : "", content ? `Treść:\n${content}` : ""]
        .filter(Boolean)
        .join("\n\n");
    }

    return JSON.stringify(object, null, 2);
  }

  return String(value);
}

function formatChangeValue(field: string, value: unknown): string | undefined {
  if (field === "lastVerifiedAt" && typeof value === "string") {
    return formatDateTimeValue(value);
  }

  return formatAuditValue(value);
}

function getInitials(name: string, surname: string): string {
  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
}

function formatTimestamp(date: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDateLabel(date: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

// -----------------------------------------------------------------------------
// Safe article value formatter
// -----------------------------------------------------------------------------

function getDisplayName(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value !== null && "name" in value) {
    return typeof value.name === "string" ? value.name : fallback;
  }

  return fallback;
}

// -----------------------------------------------------------------------------
// Audit log mapper
// -----------------------------------------------------------------------------

function mapAuditLogsToHistoryEntries(logs: ArticleAuditLog[]): HistoryEntry[] {
  return [...logs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((log) => {
      const config = eventConfig[log.eventType];

      return {
        id: log.id,

        category: config?.category ?? "STATUS",

        title: config?.title ?? log.eventType,

        description:
          config?.description ?? "Zarejestrowano zdarzenie dotyczące artykułu.",

        actor: {
          name: `${log.actor.name} ${log.actor.surname}`.trim(),
          initials: getInitials(log.actor.name, log.actor.surname),
          role: "Użytkownik",
        },

        timestamp: formatTimestamp(log.createdAt),

        dateLabel: formatDateLabel(log.createdAt),

        details: (log.changes ?? []).map((change) => ({
          label: fieldLabels[change.field] ?? change.field,
          before: formatChangeValue(change.field, change.before),
          after: formatChangeValue(change.field, change.after),
        })),
      };
    });
}

// -----------------------------------------------------------------------------
// Filters
// -----------------------------------------------------------------------------

const filters: {
  value: FilterValue;
  label: string;
}[] = [
  { value: "ALL", label: "Wszystkie" },
  { value: "TITLE", label: "Tytuł" },
  { value: "INTERNAL_NOTE", label: "Notatka wewnętrzna" },
  { value: "VARIANT", label: "Warianty odpowiedzi" },
  { value: "CLASSIFICATION", label: "Klasyfikacja" },
  { value: "VERIFICATION", label: "Weryfikacja" },
  { value: "PUBLICATION", label: "Publikacja" },
  { value: "CREATED", label: "Utworzenie" },
];

// -----------------------------------------------------------------------------
// Category configuration
// -----------------------------------------------------------------------------

export const categoryConfig: Record<
  HistoryCategory,
  {
    label: string;
    icon: typeof History;
    iconClass: string;
    backgroundClass: string;
  }
> = {
  CREATED: {
    label: "Utworzenie",
    icon: Plus,
    iconClass: "text-sky-600 dark:text-sky-400",
    backgroundClass: "bg-sky-500/10",
  },

  TITLE: {
    label: "Tytuł",
    icon: Type,
    iconClass: "text-blue-600 dark:text-blue-400",
    backgroundClass: "bg-blue-500/10",
  },

  INTERNAL_NOTE: {
    label: "Notatka wewnętrzna",
    icon: StickyNote,
    iconClass: "text-orange-600 dark:text-orange-400",
    backgroundClass: "bg-orange-500/10",
  },

  CONTENT: {
    label: "Treść",
    icon: Pencil,
    iconClass: "text-violet-600 dark:text-violet-400",
    backgroundClass: "bg-violet-500/10",
  },

  VARIANT: {
    label: "Wariant odpowiedzi",
    icon: Layers3,
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
    backgroundClass: "bg-fuchsia-500/10",
  },

  STATUS: {
    label: "Status",
    icon: History,
    iconClass: "text-amber-600 dark:text-amber-400",
    backgroundClass: "bg-amber-500/10",
  },

  CLASSIFICATION: {
    label: "Klasyfikacja",
    icon: Tag,
    iconClass: "text-indigo-600 dark:text-indigo-400",
    backgroundClass: "bg-indigo-500/10",
  },

  VERIFICATION: {
    label: "Weryfikacja",
    icon: ShieldCheck,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    backgroundClass: "bg-emerald-500/10",
  },

  PUBLICATION: {
    label: "Publikacja",
    icon: Send,
    iconClass: "text-teal-600 dark:text-teal-400",
    backgroundClass: "bg-teal-500/10",
  },
};

// -----------------------------------------------------------------------------
// Article history page
// -----------------------------------------------------------------------------

export default function ArticleHistoryPage() {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();

  const {
    data: auditLogs,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useFindByArticleQuery(articleId);

  const { data: article, isLoading: isArticleLoading } =
    useFindArticleQuery(articleId);

  const [activeFilter, setActiveFilter] = useState<FilterValue>("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  const historyEntries = useMemo(
    () => mapAuditLogsToHistoryEntries((auditLogs ?? []) as ArticleAuditLog[]),
    [auditLogs],
  );

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("pl");

    return historyEntries.filter((entry) => {
      const matchesFilter =
        activeFilter === "ALL" || entry.category === activeFilter;

      const searchableText = [
        entry.title,
        entry.description,
        entry.actor.name,
        entry.actor.role,
        categoryConfig[entry.category].label,
        ...entry.details.flatMap((detail) => [
          detail.label,
          detail.before ?? "",
          detail.after ?? "",
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase("pl");

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [activeFilter, searchQuery, historyEntries]);

  // ---------------------------------------------------------------------------
  // Grouping by date
  // ---------------------------------------------------------------------------

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, HistoryEntry[]>();

    for (const entry of filteredEntries) {
      const existing = groups.get(entry.dateLabel) ?? [];

      existing.push(entry);

      groups.set(entry.dateLabel, existing);
    }

    return Array.from(groups.entries());
  }, [filteredEntries]);

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (isHistoryLoading || isArticleLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Ładowanie historii zmian...
        </p>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // Error state
  // ---------------------------------------------------------------------------

  if (isHistoryError) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-destructive">
          Nie udało się pobrać historii zmian.
        </p>

        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 size-4" />
          Powrót
        </Button>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <main className="min-h-screen w-full min-w-0 text-foreground">
      <div className="w-full min-w-0">
        {/* Header */}

        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 rounded-lg"
              aria-label="Wróć do poprzedniej strony"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-4" />
              Powrót
            </Button>

            <nav
              aria-label="Okruszki"
              className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span>Baza wiedzy</span>

              <span aria-hidden="true">/</span>

              <span>{getDisplayName(article?.product, "Produkt")}</span>

              <span aria-hidden="true">/</span>

              <span className="max-w-[260px] truncate font-medium text-foreground">
                {getDisplayName(article?.title, "Artykuł")}
              </span>

              <span aria-hidden="true">/</span>

              <span className="font-medium text-foreground">
                Historia zmian
              </span>
            </nav>
          </div>

          {article?.publicationStatus === "PUBLISHED" && (
            <Badge
              variant="outline"
              className="w-fit shrink-0 gap-1.5 rounded-lg px-2.5 py-1 font-normal"
            >
              <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              Aktualnie opublikowany
            </Badge>
          )}
        </header>

        {/* Page title */}

        <section className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Historia zmian
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Historia aktywności i modyfikacji artykułu.
          </p>
        </section>

        {/* Filters */}

        <section className="mb-7">
          <div className="flex flex-col gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Szukaj zdarzeń, osób lub zmian..."
                aria-label="Szukaj w historii zmian"
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <Button
                    key={filter.value}
                    type="button"
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "h-8 rounded-lg border border-border px-3 font-medium"
                        : "h-8 rounded-lg px-3 font-normal text-muted-foreground"
                    }
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}

                    {filter.value === "ALL" && (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        {historyEntries.length}
                      </span>
                    )}
                  </Button>
                );
              })}

              <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
                {filteredEntries.length}{" "}
                {filteredEntries.length === 1 ? "zdarzenie" : "zdarzeń"}
              </span>
            </div>
          </div>
        </section>

        {/* Timeline */}

        <section aria-label="Oś czasu zmian" className="max-w-5xl">
          {groupedEntries.length > 0 ? (
            groupedEntries.map(([dateLabel, entries]) => (
              <div key={dateLabel} className="mb-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40">
                    <Clock3 className="size-4 text-muted-foreground" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">{dateLabel}</h2>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {entries.length}{" "}
                      {entries.length === 1 ? "zdarzenie" : "zdarzenia"}
                    </p>
                  </div>

                  <div className="h-px flex-1 bg-border/70" />
                </div>

                <div className="relative pl-1">
                  <div className="absolute bottom-8 left-5 top-0 w-px bg-border/80" />

                  <div className="space-y-1">
                    {entries.map((entry) => (
                      <ArticleAuditLogEventCard
                        key={entry.id}
                        entry={entry}
                        onShowDetails={setSelectedEntry}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
                <Search className="size-5 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                Nie znaleziono zdarzeń
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                {historyEntries.length === 0
                  ? "Ten artykuł nie posiada jeszcze historii zmian."
                  : "Zmień wyszukiwaną frazę lub wybierz inny rodzaj zdarzeń."}
              </p>

              {(searchQuery || activeFilter !== "ALL") && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("ALL");
                  }}
                >
                  Wyczyść filtry
                </Button>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Details dialog */}

      <ArticleAuditLogDetailsModal
        entry={selectedEntry}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEntry(null);
          }
        }}
      />
    </main>
  );
}
