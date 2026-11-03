/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronDown,
  FilePenLine,
  Layers3,
  Loader2,
  Package,
  Pencil,
  Plus,
  Search,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface EditableArticle {
  id: string;
  title: string;
  internalNote: string;
  product: string | { id: string; name: string } | null;
  category: string | { id: string; name: string } | null;
  tags: (string | { id: string; name: string })[];
}

export interface EditArticleFormValues {
  title: string;
  internalNote: string;
  product: string;
  category: string;
  tags: string[];
}

interface EditArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: EditableArticle;
  isPending: boolean;
  onSubmitArticle: (
    articleId: string,
    values: EditArticleFormValues,
  ) => void | Promise<void>;
}

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Podaj tytuł artykułu")
    .max(150, "Tytuł może mieć maksymalnie 150 znaków"),
  internalNote: z.string().max(5000, "Notatka jest zbyt długa"),
  product: z.string().min(1, "Wybierz produkt"),
  category: z.string().min(1, "Wybierz kategorię"),
  tags: z.array(z.string()),
});

const products = [
  { id: "synergia", name: "Synergia" },
  { id: "librus-go", name: "Librus GO" },
  { id: "biblioteka", name: "Biblioteka" },
  { id: "aplikacja-mobilna", name: "Aplikacja Mobilna" },
];

const categories = [
  { id: "lekcje", name: "Lekcje" },
  { id: "wiadomosci", name: "Wiadomości" },
  { id: "konta-uzytkownikow", name: "Konta użytkowników" },
  { id: "konfiguracja", name: "Konfiguracja" },
];

const availableTags = [
  { id: "zastepstwa", name: "zastępstwa" },
  { id: "logowanie", name: "logowanie" },
  { id: "haslo", name: "hasło" },
  { id: "wiadomosci", name: "wiadomości" },
  { id: "uczniowie", name: "uczniowie" },
  { id: "nauczyciele", name: "nauczyciele" },
  { id: "konfiguracja", name: "konfiguracja" },
];

function normalizeOptionId(
  value: string | { id: string; name: string } | null | undefined,
  options: { id: string; name: string }[],
): string {
  if (!value) return "";

  const name = typeof value === "string" ? value : value.name;
  const id = typeof value === "string" ? value : value.id;

  const byId = options.find((option) => option.id === id);
  if (byId) return byId.id;

  return (
    options.find(
      (option) =>
        option.name.toLocaleLowerCase("pl-PL") ===
        name.toLocaleLowerCase("pl-PL"),
    )?.id ?? ""
  );
}

function normalizeTags(
  values: (string | { id: string; name: string })[] | null | undefined,
): string[] {
  return [
    ...new Set(
      (values ?? [])
        .map((tag) => normalizeOptionId(tag, availableTags))
        .filter(Boolean),
    ),
  ];
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Pencil;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 pt-0.5">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function EditArticleModal({
  isOpen,
  onClose,
  article,
  isPending,
  onSubmitArticle,
}: EditArticleModalProps) {
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const defaultValues = useMemo<EditArticleFormValues>(
    () => ({
      title: article.title ?? "",
      internalNote: article.internalNote ?? "",
      product: normalizeOptionId(article.product, products),
      category: normalizeOptionId(article.category, categories),
      tags: normalizeTags(article.tags),
    }),
    [article],
  );

  const form = useForm<EditArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
      setTagDialogOpen(false);
      setTagSearch("");
    }
  }, [isOpen, defaultValues, form]);

  const selectedTags = form.watch("tags");

  const filteredTags = useMemo(
    () =>
      availableTags.filter((tag) =>
        tag.name
          .toLocaleLowerCase("pl-PL")
          .includes(tagSearch.trim().toLocaleLowerCase("pl-PL")),
      ),
    [tagSearch],
  );

  const toggleTag = (tagId: string) => {
    const currentTags = form.getValues("tags");

    form.setValue(
      "tags",
      currentTags.includes(tagId)
        ? currentTags.filter((id) => id !== tagId)
        : [...currentTags, tagId],
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isPending) {
      setTagDialogOpen(false);
      onClose();
    }
  };

  const handleSubmit = async (values: EditArticleFormValues) => {
    try {
      await onSubmitArticle(article.id, values);
      setTagDialogOpen(false);
      onClose();
    } catch {
      // Błąd obsługuje warstwa mutacji. Formularz pozostaje otwarty.
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            "flex max-h-[90dvh] flex-col gap-0 overflow-hidden",
            "rounded-[24px] border border-border/70 bg-card p-0",
            "shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)]",
            "sm:max-w-[960px] lg:max-w-[1040px]",
          )}
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-border/60 bg-linear-to-br from-violet-500/[0.09] via-primary/[0.035] to-transparent px-6 pb-6 pt-7 sm:px-8 sm:pt-8">
            <div className="pointer-events-none absolute -right-12 -top-20 size-52 rounded-full bg-violet-500/[0.07] blur-3xl" />

            <DialogHeader className="relative space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm shadow-violet-600/20">
                  <FilePenLine className="size-5" />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur">
                  <Pencil className="size-3" />
                  EDYCJA ARTYKUŁU
                </span>
              </div>

              <div className="space-y-2">
                <DialogTitle className="text-[25px] font-semibold leading-tight tracking-[-0.035em] sm:text-[28px]">
                  Edytuj artykuł
                </DialogTitle>

                <DialogDescription className="max-w-2xl text-[13px] leading-6 sm:text-sm">
                  Zaktualizuj treść i uporządkuj informacje, aby artykuł był
                  łatwy do odnalezienia i wykorzystania podczas obsługi
                  zgłoszeń.
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="scrollbar-custom min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
                <div className="space-y-7">
                  {/* Main columns */}
                  <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Article content */}
                    <section className="min-w-0">
                      <SectionHeading
                        icon={FilePenLine}
                        title="Treść artykułu"
                        description="Podstawowe informacje widoczne na karcie artykułu."
                      />

                      <div className="space-y-5 rounded-xl border border-border/60 bg-background/50 p-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <FormLabel className="text-[13px] font-medium">
                                  Tytuł artykułu
                                </FormLabel>

                                <span className="text-[11px] tabular-nums text-muted-foreground">
                                  {field.value.length}/150
                                </span>
                              </div>

                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Np. Jak zmienić hasło użytkownika?"
                                  maxLength={150}
                                  disabled={isPending}
                                  className="h-11 rounded-xl border-border/70 bg-background px-3.5 transition-colors placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="internalNote"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <FormLabel className="text-[13px] font-medium">
                                  Notatka dla pracownika
                                </FormLabel>

                                <span className="text-[11px] tabular-nums text-muted-foreground">
                                  {field.value.length}/5000
                                </span>
                              </div>

                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Opisz najważniejsze informacje, wskazówki i wyjątki przy obsłudze zgłoszenia..."
                                  maxLength={5000}
                                  disabled={isPending}
                                  className="min-h-48 resize-y rounded-xl border-border/70 bg-background px-3.5 py-3 leading-6 transition-colors placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
                                />
                              </FormControl>

                              <p className="text-[11px] leading-5 text-muted-foreground">
                                Wewnętrzna wskazówka dla zespołu pomocy
                                technicznej.
                              </p>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </section>

                    {/* Classification */}
                    <section className="min-w-0">
                      <SectionHeading
                        icon={Layers3}
                        title="Klasyfikacja"
                        description="Produkt i kategoria przypisane do artykułu."
                      />

                      <div className="space-y-5 rounded-xl border border-border/60 bg-background/50 p-4">
                        <FormField
                          control={form.control}
                          name="product"
                          render={({ field }) => (
                            <FormItem className="min-w-0 space-y-2">
                              <FormLabel className="text-[13px] font-medium">
                                Produkt
                              </FormLabel>

                              <FormControl>
                                <div className="relative">
                                  <Package className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                  <select
                                    {...field}
                                    disabled={isPending}
                                    className={cn(
                                      "h-11 w-full appearance-none rounded-xl border border-border/70",
                                      "bg-background py-2 pl-10 pr-10 text-sm text-foreground",
                                      "outline-none transition-colors",
                                      "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10",
                                      "disabled:cursor-not-allowed disabled:opacity-50",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    <option value="">Wybierz produkt</option>
                                    {products.map((product) => (
                                      <option
                                        key={product.id}
                                        value={product.id}
                                      >
                                        {product.name}
                                      </option>
                                    ))}
                                  </select>

                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="min-w-0 space-y-2">
                              <FormLabel className="text-[13px] font-medium">
                                Kategoria
                              </FormLabel>

                              <FormControl>
                                <div className="relative">
                                  <Layers3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                  <select
                                    {...field}
                                    disabled={isPending}
                                    className={cn(
                                      "h-11 w-full appearance-none rounded-xl border border-border/70",
                                      "bg-background py-2 pl-10 pr-10 text-sm text-foreground",
                                      "outline-none transition-colors",
                                      "focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10",
                                      "disabled:cursor-not-allowed disabled:opacity-50",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    <option value="">Wybierz kategorię</option>
                                    {categories.map((category) => (
                                      <option
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.name}
                                      </option>
                                    ))}
                                  </select>

                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </section>
                  </div>

                  {/* Selected tags */}
                  <section className="border-t border-border/60 pt-6">
                    <SectionHeading
                      icon={Tag}
                      title="Tagi"
                      description="Oznaczenia pomagające odnaleźć artykuł w bazie wiedzy."
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <FormLabel className="text-[13px] font-medium">
                              Tagi artykułu
                            </FormLabel>

                            <span className="text-xs tabular-nums text-muted-foreground">
                              Wybrano {selectedTags.length}
                            </span>
                          </div>

                          {selectedTags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedTags.map((tagId) => {
                                const tag = availableTags.find(
                                  (option) => option.id === tagId,
                                );

                                if (!tag) return null;

                                return (
                                  <button
                                    key={tag.id}
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => toggleTag(tag.id)}
                                    aria-label={`Usuń tag ${tag.name}`}
                                    className={cn(
                                      "group inline-flex h-8 items-center gap-2 rounded-lg",
                                      "border border-primary/20 bg-primary/[0.07] px-2.5",
                                      "text-xs font-medium text-foreground transition-colors",
                                      "hover:border-destructive/30 hover:bg-destructive/[0.06]",
                                      "disabled:cursor-not-allowed disabled:opacity-50",
                                    )}
                                  >
                                    {tag.name}
                                    <X className="size-3.5 text-muted-foreground transition-colors group-hover:text-destructive" />
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Nie przypisano jeszcze żadnych tagów.
                            </p>
                          )}

                          <div>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isPending}
                              onClick={() => {
                                setTagSearch("");
                                setTagDialogOpen(true);
                              }}
                              className="h-9 rounded-xl border-border/70 px-3 text-xs"
                            >
                              <Plus className="size-3.5" />
                              Dodaj tagi
                            </Button>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                </div>
              </div>

              {/* Footer */}
              <DialogFooter className="flex-row items-center justify-between gap-3 border-t border-border/60 bg-muted/20 px-6 py-4 sm:px-8 sm:py-5">
                <p className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Zmiany zostaną zapisane po zatwierdzeniu.
                </p>

                <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isPending}
                    onClick={onClose}
                    className="h-10 rounded-xl px-4"
                  >
                    Anuluj
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Separate tag picker dialog */}
      <Dialog
        open={tagDialogOpen}
        onOpenChange={(open) => {
          if (!isPending) {
            setTagDialogOpen(open);
            if (!open) setTagSearch("");
          }
        }}
      >
        <DialogContent className="flex max-h-[min(560px,80dvh)] flex-col gap-0 overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-2xl sm:max-w-[480px]">
          <div className="border-b border-border/60 px-5 py-5">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground">
                <Tag className="size-5" />
              </div>

              <DialogTitle className="text-lg font-semibold tracking-tight">
                Dodaj tagi
              </DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Wybierz dowolną liczbę tagów. Zaznaczone pozycje zostaną
                przypisane do artykułu.
              </DialogDescription>
            </DialogHeader>

            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                autoFocus
                value={tagSearch}
                onChange={(event) => setTagSearch(event.target.value)}
                placeholder="Szukaj tagu..."
                disabled={isPending}
                className="h-10 rounded-xl border-border/70 bg-background pl-9 pr-9 focus-visible:ring-4 focus-visible:ring-primary/10"
              />

              {tagSearch && (
                <button
                  type="button"
                  aria-label="Wyczyść wyszukiwanie"
                  onClick={() => setTagSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Dostępne tagi
              </span>
              <span className="text-xs font-medium tabular-nums text-foreground">
                {selectedTags.length} wybr.
              </span>
            </div>
          </div>

          {/* Only this list scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {filteredTags.length > 0 ? (
              <div className="space-y-1">
                {filteredTags.map((tag) => {
                  const selected = selectedTags.includes(tag.id);

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
                        selected ? "bg-primary/[0.07]" : "hover:bg-muted/60",
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
                <p className="mt-2 text-sm font-medium">Nie znaleziono tagów</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Zmień wpisaną frazę wyszukiwania.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-muted/20 px-5 py-4">
            <span className="text-xs text-muted-foreground">
              Kliknij tag, aby go zaznaczyć lub odznaczyć.
            </span>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => {
                setTagDialogOpen(false);
                setTagSearch("");
              }}
              className="h-9 shrink-0 rounded-xl px-4"
            >
              Gotowe
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
