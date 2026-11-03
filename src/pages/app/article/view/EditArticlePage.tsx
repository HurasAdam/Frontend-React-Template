/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  ArrowLeft,
  Clock3,
  FileText,
  Hash,
  ListOrdered,
  MessageSquareText,
  Pencil,
  Plus,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFindArticleQuery } from "../../../../hooks/articles/queries/use-articles.queries";
import { SettingsCard } from "../../settings/components/SettingsCard";
import { SettingsRow } from "../../settings/components/SettingsRow";
import { EditArticleModalsSection } from "../components/EditArticleModalsSection";
import ResponseVariantModalsSection from "../components/ResponseVariantModalsSection";
import { useArticleResponseVariantModal } from "../hooks/useArticleResponseVariantModal";
import { useEditArticleModal } from "../hooks/useEditArticleModal";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function EditArticleSection({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm font-medium">{title}</h2>
      <SettingsCard>{children}</SettingsCard>
    </section>
  );
}

type EditActionProps = {
  onClick?: () => void;
  label?: string;
};

function EditAction({ onClick, label = "Edytuj" }: EditActionProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className="h-8 shrink-0 gap-2 px-3"
    >
      <Pencil className="size-3.5" />
      {label}
    </Button>
  );
}

function SettingsDivider() {
  return <div className="mx-6 h-px bg-border" />;
}

type TagListProps = {
  tags: {
    id: string;
    name: string;
  }[];
};

function TagList({ tags }: TagListProps) {
  if (tags.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">Brak przypisanych tagów.</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant="secondary"
          className="rounded-md font-normal"
        >
          <Hash className="mr-1 size-3 text-muted-foreground" />
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getReviewStatus(status: string) {
  switch (status) {
    case "DRAFT":
      return {
        label: "Szkic",
        className: "border-border bg-muted/50 text-muted-foreground",
      };

    case "PENDING_REVIEW":
      return {
        label: "Oczekuje na weryfikację",
        className:
          "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
      };

    case "APPROVED":
      return {
        label: "Zweryfikowany",
        className: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600",
      };

    case "REQUIRES_REVERIFICATION":
      return {
        label: "Wymaga ponownej weryfikacji",
        className:
          "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
      };

    case "CHANGES_REQUESTED":
      return {
        label: "Wymaga poprawek",
        className:
          "border-orange-500/30 bg-orange-500/5 text-orange-600 dark:text-orange-400",
      };

    case "REJECTED":
      return {
        label: "Odrzucony",
        className: "border-destructive/30 bg-destructive/5 text-destructive",
      };

    default:
      return {
        label: status,
        className: "border-border bg-muted/50 text-muted-foreground",
      };
  }
}

export const EditArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const { data, isLoading, isError } = useFindArticleQuery(articleId!);

  const editModal = useEditArticleModal();
  const responseVariantModal = useArticleResponseVariantModal();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">Ładowanie artykułu...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <FileText className="size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium">Nie udało się pobrać artykułu.</p>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 size-4" />
          Powrót
        </Button>
      </div>
    );
  }

  const reviewStatus = getReviewStatus(data.reviewStatus);

  return (
    <>
      <main className="min-h-screen text-foreground">
        <div className="w-full min-w-0">
          {/* Header and navigation */}
          <header className="mb-8 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 gap-2"
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
                <span>{data.product.name}</span>
                <span aria-hidden="true">/</span>
                <span className="break-words font-medium text-foreground">
                  {data.title}
                </span>
                <span aria-hidden="true">/</span>
                <span className="font-medium text-foreground">Edycja</span>
              </nav>
            </div>

            <div className="flex shrink-0 items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  // TODO: otwarcie akcji przesłania artykułu do weryfikacji.
                }}
              >
                <Clock3 className="size-4" />
                <span>Prześlij do weryfikacji</span>
              </Button>
            </div>
          </header>

          {/* Page title */}
          <div className="mb-10">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <FileText className="size-5" />
              <span className="text-xs">Ustawienia artykułu</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Edycja artykułu
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Zarządzaj informacjami, klasyfikacją oraz wariantami odpowiedzi.
              Każdą sekcję możesz edytować niezależnie.
            </p>
          </div>

          {/* Basic information */}
          <EditArticleSection title="Informacje podstawowe">
            <SettingsRow
              title="Tytuł artykułu"
              description={data.title}
              right={<EditAction onClick={() => editModal.openTitle()} />}
            />

            <SettingsDivider />

            <SettingsRow
              title="Notatka dla pracownika"
              description={data.internalNote || "Brak notatki wewnętrznej."}
              right={
                <EditAction onClick={() => editModal.openInternalNote()} />
              }
            />
          </EditArticleSection>

          {/* Classification */}
          <EditArticleSection title="Klasyfikacja">
            <SettingsRow
              title="Produkt i kategoria"
              description="Określ produkt oraz kategorię, do której należy artykuł."
              right={
                <EditAction onClick={() => editModal.openProductCategory()} />
              }
            />

            <div className="px-6 pb-5">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="min-w-0">
                  <p className="mb-1 text-xs text-muted-foreground">Produkt</p>
                  <p className="text-sm font-medium">{data.product.name}</p>
                </div>

                <div className="hidden h-8 w-px bg-border sm:block" />

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-muted-foreground">
                    Kategoria
                  </p>
                  <p className="text-sm font-medium">{data.category.name}</p>
                </div>
              </div>
            </div>
          </EditArticleSection>

          {/* Tags */}
          <EditArticleSection title="Tagi">
            <SettingsRow
              title="Tagi artykułu"
              description="Słowa kluczowe ułatwiające wyszukiwanie artykułu."
              right={<EditAction onClick={() => editModal.openTags()} />}
            />

            <div className="px-6 pb-5">
              <TagList tags={data.tags} />
            </div>
          </EditArticleSection>

          {/* Response variants */}
          <EditArticleSection title="Warianty odpowiedzi">
            <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium">Treści odpowiedzi</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Zarządzaj szablonami odpowiedzi i ustal ich kolejność.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5"
                  onClick={() => responseVariantModal.openReorder()}
                >
                  <ListOrdered className="size-3.5" />
                  Zarządzaj kolejnością
                </Button>

                <Button
                  type="button"
                  size="sm"
                  className="h-8 gap-1.5"
                  onClick={() => responseVariantModal.openAdd()}
                >
                  <Plus className="size-3.5" />
                  Dodaj wariant
                </Button>
              </div>
            </div>

            <SettingsDivider />

            {data.responseVariants.length > 0 ? (
              [...data.responseVariants]
                .sort((a, b) => a.order - b.order)
                .map((variant, index) => (
                  <div key={variant.id}>
                    {index > 0 && <SettingsDivider />}

                    <div className="flex items-start gap-4 px-6 py-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <MessageSquareText className="size-4 text-muted-foreground" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">
                            {variant.variantName}
                          </p>

                          {variant.order === 0 && (
                            <Badge
                              variant="secondary"
                              className="gap-1 rounded-md text-[10px] font-normal"
                            >
                              <Star className="size-3" />
                              Domyślny
                            </Badge>
                          )}
                        </div>

                        <p className="mt-2 line-clamp-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                          {variant.variantContent}
                        </p>

                        <Button
                          type="button"
                          variant="link"
                          className="mt-2 h-auto p-0 text-xs"
                          onClick={() => responseVariantModal.openEdit(variant)}
                        >
                          Edytuj treść
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="px-6 py-10 text-center">
                <MessageSquareText className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium">
                  Brak wariantów odpowiedzi
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Dodaj pierwszy wariant, aby przygotować szablon odpowiedzi.
                </p>
              </div>
            )}
          </EditArticleSection>

          {/* Article information */}
          <EditArticleSection title="Informacje o artykule">
            <SettingsRow
              title="Ostatnia aktualizacja"
              description="Data ostatniej modyfikacji artykułu"
              right={
                <span className="text-right text-xs text-muted-foreground">
                  {formatDate(data.updatedAt)}
                </span>
              }
            />

            <SettingsDivider />

            <SettingsRow
              title="Status weryfikacji"
              description="Aktualny stan zatwierdzenia artykułu"
              right={
                <Badge
                  variant="outline"
                  className={`shrink-0 font-normal ${reviewStatus.className}`}
                >
                  {reviewStatus.label}
                </Badge>
              }
            />

            {data.lastVerifiedAt && (
              <>
                <SettingsDivider />

                <SettingsRow
                  title="Ostatnia weryfikacja"
                  description={
                    data.verifiedBy
                      ? `Zweryfikował: ${data.verifiedBy.name} ${data.verifiedBy.surname}`
                      : "Data ostatniej weryfikacji artykułu"
                  }
                  right={
                    <span className="text-right text-xs text-muted-foreground">
                      {formatDate(data.lastVerifiedAt)}
                    </span>
                  }
                />
              </>
            )}
          </EditArticleSection>
        </div>
      </main>

      {/* Article edit modals */}
      <EditArticleModalsSection
        type={editModal.type}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        article={data}
      />

      {/* Response variant modals */}
      <ResponseVariantModalsSection
        isOpen={responseVariantModal.isOpen}
        type={responseVariantModal.type}
        onClose={responseVariantModal.close}
        variant={responseVariantModal.variant}
      />
    </>
  );
};
