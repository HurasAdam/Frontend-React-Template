/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Check, Loader2, Search, ShieldCheck, Tag, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useFindTagsQuery } from "../../../../hooks/tags/queries/use-tags.queries";

export interface ArticleTag {
  id: string;
  name: string;
}

interface EditArticleTagsModalProps {
  open: boolean;
  closeOnOutsideClick?: boolean;
  articleId: string;
  tags: ArticleTag[];
  isPending: boolean;
  onClose: () => void;
  onSubmit: (articleId: string, tagIds: string[]) => void | Promise<void>;
}

export function EditArticleTagsModal({
  open,
  closeOnOutsideClick,
  articleId,
  tags,
  isPending,
  onClose,
  onSubmit,
}: EditArticleTagsModalProps) {
  const { data: availableTags = [], isLoading } = useFindTagsQuery({
    name: "",
  });

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(() => [
    ...new Set(tags.map((tag) => tag.id)),
  ]);

  const [search, setSearch] = useState("");

  const allTags = useMemo(() => {
    const tagMap = new Map<string, ArticleTag>();

    [...tags, ...availableTags].forEach((tag) => {
      tagMap.set(tag.id, tag);
    });

    return Array.from(tagMap.values());
  }, [tags, availableTags]);

  const selectedTags = useMemo(
    () =>
      selectedTagIds
        .map((id) => allTags.find((tag) => tag.id === id))
        .filter((tag): tag is ArticleTag => Boolean(tag)),
    [selectedTagIds, allTags],
  );

  const filteredTags = useMemo(
    () =>
      allTags.filter((tag) =>
        tag.name
          .toLocaleLowerCase("pl-PL")
          .includes(search.trim().toLocaleLowerCase("pl-PL")),
      ),
    [allTags, search],
  );

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId],
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTagIds((current) => current.filter((id) => id !== tagId));
  };

  const handleClose = () => {
    if (isPending) return;

    onClose();
  };

  const handleSubmit = async () => {
    try {
      await onSubmit({ tags: selectedTagIds });
      onClose();
    } catch {
      // Błąd obsługuje warstwa mutacji.
      // Modal pozostaje otwarty.
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? {
              onPointerDownOutside: (event) => {
                event.preventDefault();
              },
            }
          : {})}
        className={cn(
          "flex h-[min(800px,90dvh)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden",
          "rounded-[24px] border border-border/70 bg-card p-0",
          "shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)]",
          "sm:max-w-[800px] lg:max-w-[860px]",
        )}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-border/60 bg-linear-to-br from-violet-500/[0.09] via-primary/[0.035] to-transparent px-6 py-4 sm:px-8 sm:py-5">
          <div className="pointer-events-none absolute -right-12 -top-20 size-52 rounded-full bg-violet-500/[0.07] blur-3xl" />

          <DialogHeader className="relative text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/20">
                <Tag className="size-[18px]" />
              </div>

              <DialogTitle className="text-[24px] font-semibold leading-tight tracking-[-0.035em] sm:text-[27px]">
                Zarządzaj tagami
              </DialogTitle>
            </div>
          </DialogHeader>
        </div>

        {/* Main content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-4 sm:px-8 sm:py-5">
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            {/* Selected tags */}
            <section className="shrink-0 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Przypisane tagi
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Tagi aktualnie przypisane do artykułu.
                  </p>
                </div>

                <span className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground">
                  {selectedTagIds.length} wybrano
                </span>
              </div>

              {selectedTags.length > 0 ? (
                <div className="flex max-h-[76px] min-h-[40px] flex-wrap content-start gap-1.5 overflow-hidden rounded-xl border border-border/60 bg-background/50 p-2">
                  {selectedTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      disabled={isPending}
                      onClick={() => removeTag(tag.id)}
                      aria-label={`Usuń tag ${tag.name}`}
                      className={cn(
                        "group inline-flex h-7 items-center gap-1 rounded-md",
                        "border border-primary/20 bg-primary/[0.07] px-2",
                        "text-[11px] font-medium text-foreground transition-colors",
                        "hover:border-destructive/30 hover:bg-destructive/[0.06]",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      {tag.name}

                      <X className="size-3 text-muted-foreground transition-colors group-hover:text-destructive" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/10 px-4 py-5 text-center">
                  <Tag className="size-6 text-muted-foreground/50" />

                  <p className="mt-2 text-sm font-medium">
                    Brak przypisanych tagów
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Zaznacz tagi z listy poniżej.
                  </p>
                </div>
              )}
            </section>

            {/* Available tags */}
            <section className="flex min-h-0 flex-1 flex-col space-y-3 border-t border-border/60 pt-4">
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Dostępne tagi
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Zaznacz tagi, które chcesz przypisać do artykułu.
                  </p>
                </div>

                {selectedTagIds.length > 0 && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setSelectedTagIds([])}
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                  >
                    Wyczyść wybrane
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative shrink-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  autoFocus={false}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Szukaj tagu..."
                  disabled={isPending}
                  className="h-10 rounded-xl border-border/70 bg-background pl-9 pr-9 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
                />

                {search && (
                  <button
                    type="button"
                    aria-label="Wyczyść wyszukiwanie"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Scrollable tag list */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-custom rounded-xl border border-border/60 bg-background/50 p-2">
                {isLoading ? (
                  <div className="flex h-full min-h-40 items-center justify-center">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredTags.length > 0 ? (
                  <div className="space-y-1">
                    {filteredTags.map((tag) => {
                      const selected = selectedTagIds.includes(tag.id);

                      return (
                        <button
                          key={tag.id}
                          type="button"
                          disabled={isPending}
                          aria-pressed={selected}
                          onClick={() => toggleTag(tag.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left",
                            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                            selected
                              ? "bg-primary/[0.07]"
                              : "hover:bg-muted/60",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background",
                            )}
                          >
                            {selected && <Check className="size-3.5" />}
                          </span>

                          <span className="min-w-0 flex-1 text-sm font-medium">
                            {tag.name}
                          </span>

                          {selected && (
                            <span className="text-[11px] font-medium text-primary">
                              Wybrano
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-10 text-center">
                    <Search className="mx-auto size-5 text-muted-foreground/60" />

                    <p className="mt-2 text-sm font-medium">
                      Nie znaleziono tagów
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Zmień wpisaną frazę wyszukiwania.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 px-1">
                <span className="text-xs text-muted-foreground">
                  Kliknij tag, aby go zaznaczyć lub odznaczyć.
                </span>

                <span className="shrink-0 text-xs font-medium tabular-nums text-foreground">
                  {selectedTagIds.length} / {allTags.length}
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="!flex-row !justify-between !items-center !space-x-0 shrink-0 gap-3 border-t border-border/60 bg-muted/20 px-6 py-4 sm:px-8 sm:py-5">
          <p className="flex flex-1 items-center gap-2 pl-3 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
            Zmiany zostaną zatwierdzone po zapisaniu.
          </p>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={handleClose}
              className="h-10 rounded-xl px-4"
            >
              Anuluj
            </Button>

            <Button
              type="button"
              disabled={isPending}
              onClick={handleSubmit}
              className="h-10 rounded-xl px-5 shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Zapisz zmiany
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
