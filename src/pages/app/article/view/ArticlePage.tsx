/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  Archive,
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  EyeOff,
  FileCog,
  Globe,
  History,
  MessageSquareText,
  MoreHorizontal,
  Package,
  Pencil,
  Pin,
  Plus,
  Sparkles,
  Tags,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useFindArticleQuery } from "../../../../hooks/articles/queries/use-articles.queries";
import ArticleModalsSection from "../components/ArticleModalsSection";
import {
  ArticleReviewBanner,
  type ArticlePublicationStatus,
  type ArticleReviewStatus,
} from "../components/banners/ArticleReviewBanner";
import ResponseVariantModalsSection from "../components/ResponseVariantModalsSection";
import { VariantCard } from "../components/VariantCard";
import { useArticleModal } from "../hooks/useArticleModal";
import { useArticleResponseVariantModal } from "../hooks/useArticleResponseVariantModal";

type ResponseVariant = {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
  note?: string;
};

type EditableDetail = "productCategory" | "internalNote";

function EditableDetailRow({
  field,
  label,
  value,
  icon: Icon,
  onClick,
  secondaryLabel,
  secondaryValue,
  secondaryIcon: SecondaryIcon,
}: {
  label: string;
  value: ReactNode;
  icon: typeof Package;
  onClick: (field: EditableDetail) => void;
  field: EditableDetail;
  secondaryLabel?: string;
  secondaryValue?: ReactNode;
  secondaryIcon?: typeof Package;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(field)}
      className="group flex w-full items-center gap-3 border-b border-border/70 py-3 text-left last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/30 text-muted-foreground transition-colors group-hover:bg-muted/60 group-hover:text-foreground">
            <Icon className="size-3.5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[11px] text-muted-foreground">
              {label}
            </span>
            <span className="mt-0.5 block break-words text-[13px] font-medium text-foreground">
              {value}
            </span>
          </span>
        </div>

        {secondaryLabel && (
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/30 text-muted-foreground transition-colors group-hover:bg-muted/60 group-hover:text-foreground">
              {SecondaryIcon && <SecondaryIcon className="size-3.5" />}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[11px] text-muted-foreground">
                {secondaryLabel}
              </span>
              <span className="mt-0.5 block break-words text-[13px] font-medium text-foreground">
                {secondaryValue}
              </span>
            </span>
          </div>
        )}
      </div>

      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
    </button>
  );
}

function getVariantCountLabel(count: number) {
  if (count === 1) return "wariant";

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    !(count % 100 >= 12 && count % 100 <= 14)
  ) {
    return "warianty";
  }

  return "wariantów";
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function ChangeRequestNoteIndicator({
  note,
  open,
  onOpenChange,
}: {
  note: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!note.trim()) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-haspopup="dialog"
        aria-label="Otwórz uwagi lidera"
        className="group flex w-full items-start gap-3 rounded-md border border-amber-500/25 bg-amber-500/[0.035] px-3.5 py-3 text-left transition-colors hover:border-amber-500/40 hover:bg-amber-500/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
          <MessageSquareText className="size-3.5" />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">
            Uwagi lidera
          </span>
          <span className="text-xs leading-5 text-muted-foreground">
            Artykuł wymaga poprawy zgodnie z przekazanymi uwagami.
          </span>
        </span>

        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          Wyświetl uwagi
          <span aria-hidden="true">↗</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
          <DialogHeader className="border-b border-border px-6 py-5 pr-12">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/[0.06] text-amber-700 dark:text-amber-400">
                <MessageSquareText className="size-4" />
              </span>
              <div className="min-w-0">
                <DialogTitle className="text-base">Uwagi lidera</DialogTitle>
                <DialogDescription className="mt-1 text-xs">
                  Informacje dotyczące wymaganych poprawek artykułu.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto px-6 py-5">
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-foreground/90">
              {note}
            </p>
          </div>

          <div className="flex justify-end border-t border-border px-6 py-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Zamknij
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const reviewStatusConfig: Record<
  ArticleReviewStatus,
  {
    label: string;
    buttonClassName: string;
    indicatorClassName: string;
  }
> = {
  DRAFT: {
    label: "Wersja robocza",
    buttonClassName:
      "border-border bg-muted/50 text-muted-foreground hover:bg-muted",
    indicatorClassName: "bg-muted-foreground",
  },
  PENDING_REVIEW: {
    label: "Wymaga weryfikacji",
    buttonClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/15 dark:text-amber-400",
    indicatorClassName: "bg-amber-500",
  },
  APPROVED: {
    label: "Zweryfikowany",
    buttonClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-400",
    indicatorClassName: "bg-emerald-500",
  },
  CHANGES_REQUESTED: {
    label: "Wymaga poprawy",
    buttonClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/15 dark:text-amber-400",
    indicatorClassName: "bg-amber-500",
  },
  REJECTED: {
    label: "Odrzucony",
    buttonClassName:
      "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15",
    indicatorClassName: "bg-destructive",
  },
};

const publicationStatusConfig: Record<
  ArticlePublicationStatus,
  { label: string; icon: typeof Globe }
> = {
  PUBLISHED: {
    label: "Opublikowany",
    icon: Globe,
  },
  UNPUBLISHED: {
    label: "Nieopublikowany",
    icon: EyeOff,
  },
  ARCHIVED: {
    label: "Zarchiwizowany",
    icon: Archive,
  },
};

export function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [isChangeRequestNoteOpen, setIsChangeRequestNoteOpen] = useState(false);

  const responseVariantModal = useArticleResponseVariantModal();
  const articleModal = useArticleModal();

  const { data } = useFindArticleQuery(articleId!);

  const variants: ResponseVariant[] = data?.responseVariants ?? [];

  const changeRequestNote =
    typeof data?.changeRequestNote === "string" ? data.changeRequestNote : "";

  const hasChangeRequestNote = Boolean(changeRequestNote.trim());

  const reviewerName = data?.verifiedBy
    ? `${data.verifiedBy.name} ${data.verifiedBy.surname}`
    : "—";

  const reviewStatus: ArticleReviewStatus =
    (data?.reviewStatus as ArticleReviewStatus | undefined) ?? "DRAFT";

  const publicationStatus: ArticlePublicationStatus =
    (data?.publicationStatus as ArticlePublicationStatus | undefined) ??
    "UNPUBLISHED";

  const reviewConfig = data?.requiresReverification
    ? {
        label: "Wymaga weryfikacji",
        buttonClassName:
          "border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/15 dark:text-amber-400",
        indicatorClassName: "bg-amber-500",
      }
    : (reviewStatusConfig[reviewStatus] ?? reviewStatusConfig.DRAFT);

  const publicationConfig =
    publicationStatusConfig[publicationStatus] ??
    publicationStatusConfig.UNPUBLISHED;

  const PublicationIcon = publicationConfig.icon;

  const authorName = data?.author
    ? `${data.author.firstName} ${data.author.lastName}`
    : "—";

  const reviewerDescription = data?.requiresReverification
    ? "Oczekuje na ponowną weryfikację"
    : reviewStatus === "APPROVED"
      ? `Zatwierdził ${reviewerName}`
      : reviewStatus === "PENDING_REVIEW"
        ? "Oczekuje na weryfikację"
        : reviewStatus === "CHANGES_REQUESTED"
          ? "Przekazano uwagi do autora"
          : reviewStatus === "REJECTED"
            ? `Odrzucił ${reviewerName}`
            : "Artykuł nie został jeszcze zatwierdzony";

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Nagłówek strony */}
        <header className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              aria-label="Wróć do poprzedniej strony"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              Powrót
            </Button>

            <nav
              aria-label="Okruszki"
              className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span>Baza wiedzy</span>
              <span aria-hidden="true">/</span>
              <span>{data?.product?.name ?? "Produkt"}</span>
              <span aria-hidden="true">/</span>
              <span className="break-words font-medium text-foreground">
                {data?.title ?? "Artykuł"}
              </span>
            </nav>
          </div>

          <div className="flex shrink-0 items-center">
            <Button
              onClick={() => articleModal.openSubmitForReview()}
              variant="outline"
              size="sm"
            >
              <Clock3 />
              <span>Prześlij do weryfikacji</span>
            </Button>
          </div>
        </header>

        {/* Tytuł i akcje artykułu */}
        <section className="grid grid-cols-1 items-start gap-5 pb-5 pt-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-4">
            {/* Panel tytułu */}
            <div className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${reviewConfig.buttonClassName}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${reviewConfig.indicatorClassName}`}
                  />
                  {reviewConfig.label}
                </span>

                {data?.importantMarker === "pin" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-4/10 px-2.5 py-1 text-[11px] font-medium text-chart-4">
                    <Pin className="size-3" />
                    Przypięty
                  </span>
                )}

                {data?.category?.name && (
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    {data.category.name}
                  </span>
                )}
              </div>

              <h1 className="mt-4 break-words text-2xl font-semibold leading-tight tracking-tight sm:text-[24px]">
                {data?.title ?? "Artykuł"}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                <span>
                  Autor:{" "}
                  <span className="font-medium text-foreground/80">
                    {authorName}
                  </span>
                </span>

                <span
                  className="hidden text-border sm:inline"
                  aria-hidden="true"
                >
                  /
                </span>

                <span>
                  Dodano{" "}
                  <span className="font-medium text-foreground/80">
                    {formatDate(data?.createdAt)}
                  </span>
                </span>

                <span
                  className="hidden text-border sm:inline"
                  aria-hidden="true"
                >
                  /
                </span>

                <span>
                  {variants.length} {getVariantCountLabel(variants.length)}
                </span>
              </div>
            </div>

            {/* Tagi artykułu i menu akcji */}
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                {data?.tags && data.tags.length > 0 ? (
                  data.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-md border border-border bg-muted/40 px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      #{tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Brak tagów
                  </span>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-muted-foreground"
                    aria-label="Opcje tagów artykułu"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-52 rounded-2xl border-border/70 bg-popover p-1.5 shadow-xl"
                >
                  <div className="px-3 py-2.5">
                    <p className="text-xs font-semibold text-foreground">
                      Zarządzanie tagami
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Dostępne akcje
                    </p>
                  </div>

                  <DropdownMenuSeparator className="bg-border/60" />

                  <DropdownMenuItem
                    onClick={() => console.info("Otwórz modal edycji: tags")}
                    className="cursor-pointer rounded-xl px-2.5 py-2.5"
                  >
                    <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Pencil className="size-4 text-muted-foreground" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Edytuj tagi
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Dodaj lub usuń przypisane tagi
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Kafelki akcji */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <button
              type="button"
              onClick={() => navigate(`/articles/${articleId}/history`)}
              className="group flex min-h-[68px] min-w-0 items-center gap-2.5 rounded-lg border border-dashed border-border/80 bg-transparent p-3 text-left transition-colors hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground transition-colors group-hover:text-foreground">
                <History className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium leading-5 tracking-tight text-foreground">
                  Historia zmian
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                  Wcześniejsze wersje artykułu
                </span>
              </span>
            </button>

            <button
              onClick={() => navigate(`/articles/${articleId}/edit`)}
              type="button"
              className="group flex min-h-[68px] min-w-0 items-center gap-2.5 rounded-lg border border-dashed border-border/80 bg-transparent p-3 text-left transition-colors hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground transition-colors group-hover:text-foreground">
                <FileCog className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium leading-5 tracking-tight text-foreground">
                  Ustawienia artykułu
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                  Edytuj zawartość artykułu
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => responseVariantModal.openAdd()}
              className="group flex min-h-[68px] min-w-0 items-center gap-2.5 rounded-lg border border-dashed border-border/80 bg-transparent p-3 text-left transition-colors hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground transition-colors group-hover:text-foreground">
                <Plus className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium leading-5 tracking-tight text-foreground">
                  Dodaj wariant odpowiedzi
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                  Utwórz gotową odpowiedź
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* Główna zawartość i panel szczegółów */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-5">
            <ArticleReviewBanner
              reviewStatus={reviewStatus}
              lastVerifiedAt={data?.lastVerifiedAt ?? null}
              publicationStatus={publicationStatus}
              onApprove={() => articleModal.openApprove()}
              onRequestChanges={() => articleModal.openRequestChanges()}
              onVerify={() => articleModal.openVerify()}
            />

            {hasChangeRequestNote && (
              <ChangeRequestNoteIndicator
                note={changeRequestNote}
                open={isChangeRequestNoteOpen}
                onOpenChange={setIsChangeRequestNoteOpen}
              />
            )}

            {data?.internalNote && (
              <section className="mx-auto w-[99%] rounded-md border border-chart-4/25 border-l-2 border-l-chart-4 bg-chart-4/5 px-4 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-chart-4">
                  <Sparkles className="size-4" />
                  Notatka dla pracownika
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-foreground/85">
                  {data.internalNote}
                </p>
              </section>
            )}

            {/* Warianty odpowiedzi */}
            <section
              className="rounded-lg border border-border bg-card p-5 sm:p-6"
              aria-labelledby="variants-title"
            >
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    id="variants-title"
                    className="text-base font-semibold tracking-tight"
                  >
                    Warianty odpowiedzi
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Gotowe odpowiedzi do wykorzystania w zgłoszeniach
                  </p>
                </div>

                <span className="shrink-0 rounded-md bg-muted/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                  {variants.length} {getVariantCountLabel(variants.length)}
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-md border border-border bg-background">
                {variants.length > 0 ? (
                  <div className="divide-y divide-border">
                    {variants.map((variant) => (
                      <VariantCard
                        key={variant.id}
                        variant={variant}
                        onEdit={responseVariantModal.openEdit}
                        onDelete={responseVariantModal.openDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center px-5 py-10 text-center">
                    <div className="grid size-10 place-items-center rounded-lg border border-border bg-muted/30">
                      <MessageSquareText className="size-4 text-muted-foreground" />
                    </div>
                    <p className="mt-3 text-sm font-medium">
                      Brak wariantów odpowiedzi
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                      Dodaj gotową odpowiedź, aby ułatwić pracownikom obsługę
                      podobnych zgłoszeń.
                    </p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      size="sm"
                      onClick={() => responseVariantModal.openAdd()}
                    >
                      <Plus />
                      Dodaj wariant
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-6">
            <section className="rounded-xl border border-border bg-card p-5">
              {/* Status weryfikacji */}
              <section className="border-b border-border pb-4">
                <p className="text-xs font-semibold text-muted-foreground">
                  Status weryfikacji
                </p>

                <div
                  className={`mt-3 flex w-full items-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium ${reviewConfig.buttonClassName}`}
                >
                  <span
                    className={`size-2 shrink-0 rounded-full ${reviewConfig.indicatorClassName}`}
                  />
                  <span className="min-w-0 break-words">
                    {reviewConfig.label}
                  </span>
                </div>

                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
                  {reviewStatus === "APPROVED" &&
                  !data?.requiresReverification ? (
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Clock3 className="mt-0.5 size-3 shrink-0" />
                  )}
                  <span>{reviewerDescription}</span>
                </p>
              </section>

              {/* Informacje o artykule */}
              <div className="pt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
                  Szczegóły artykułu
                </p>

                <EditableDetailRow
                  field="productCategory"
                  label="Produkt"
                  value={data?.product?.name ?? "Nie przypisano"}
                  icon={Package}
                  onClick={(field) =>
                    console.info("Otwórz modal edycji:", field)
                  }
                />

                <EditableDetailRow
                  field="productCategory"
                  label="Kategoria"
                  value={data?.category?.name ?? "Nie przypisano"}
                  icon={Tags}
                  onClick={(field) =>
                    console.info("Otwórz modal edycji:", field)
                  }
                />

                <div className="flex items-center justify-between gap-4 border-b border-border/70 py-3">
                  <span className="text-xs text-muted-foreground">Autor</span>
                  <span className="text-right text-[13px] font-medium text-foreground">
                    {authorName}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-border/70 py-3">
                  <span className="text-xs text-muted-foreground">
                    Publikacja
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${
                      publicationStatus === "PUBLISHED"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <PublicationIcon className="size-3.5 shrink-0" />
                    {publicationConfig.label}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-border/70 py-3">
                  <span className="text-xs text-muted-foreground">Dodano</span>
                  <span className="font-mono text-xs font-medium text-foreground">
                    {formatDate(data?.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-xs text-muted-foreground">
                    Obserwujący
                  </span>
                  <span className="inline-flex -space-x-1.5">
                    <span className="grid size-7 place-items-center rounded-full border-2 border-card bg-primary text-[10px] font-bold text-primary-foreground">
                      MZ
                    </span>
                    <span className="grid size-7 place-items-center rounded-full border-2 border-card bg-muted text-[10px] font-bold text-muted-foreground">
                      TG
                    </span>
                    <span className="grid size-7 place-items-center rounded-full border-2 border-card bg-muted text-[10px] font-bold text-muted-foreground">
                      +4
                    </span>
                  </span>
                </div>
              </div>

              {/* Akcje artykułu */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <Button
                  onClick={() => articleModal.openArchivize()}
                  variant="destructive"
                  size="sm"
                >
                  <Archive />
                  Archiwizuj
                </Button>
                <Button variant="outline" size="sm">
                  <Bell />
                  Obserwuj
                </Button>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Modale wariantów odpowiedzi */}
      <ResponseVariantModalsSection
        isOpen={responseVariantModal.isOpen}
        type={responseVariantModal.type}
        onClose={responseVariantModal.close}
        variant={responseVariantModal.variant}
      />

      {/* Modale artykułu */}
      <ArticleModalsSection
        article={data}
        isOpen={articleModal.isOpen}
        type={articleModal.type}
        onClose={articleModal.close}
        articleId={articleId!}
        articleTitle={data?.title ?? ""}
        changeRequestNote={data?.changeRequestNote ?? null}
        isPending={false}
      />
    </main>
  );
}
