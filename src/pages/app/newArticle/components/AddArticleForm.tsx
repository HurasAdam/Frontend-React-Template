import {
  Box,
  CheckIcon,
  ChevronsUpDown,
  FileText,
  FolderTree,
  Info,
  Tags,
  Type,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { VariantCard } from "../../workspace/subpages/new-article/components/VariantCard";

interface SelectOption {
  value: string;
  label: string;
  color?: string;
}

interface TagOption {
  id: string;
  name: string;
}

interface AddArticleFormProps {
  products: SelectOption[];
  categories: SelectOption[];
  tags: TagOption[];
  onProductChange: (product: string) => void;
}

export const AddArticleForm = ({
  products,
  categories,
  tags,
  onProductChange,
}: AddArticleFormProps) => {
  const form = useFormContext();

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);

  return (
    <div className="w-full pb-6">
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* ============================================================
            MAIN CONTENT
        ============================================================ */}
        <main className="min-w-0 space-y-6">
          {/* TITLE + TAGS */}
          <section className="rounded-xl border bg-card">
            <div className="px-6 py-5">
              {/* TITLE HEADER */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Type className="size-4" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">Tytuł artykułu</h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Tytuł powinien jasno określać problem lub temat artykułu.
                  </p>
                </div>
              </div>

              {/* TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="np. Jak zresetować hasło użytkownika?"
                        className="
                          h-12
                          rounded-lg
                          border-border
                          bg-background
                          px-4
                          text-[15px]
                          shadow-none
                          transition-colors
                          placeholder:text-muted-foreground/50
                          focus-visible:border-ring
                          focus-visible:ring-2
                          focus-visible:ring-ring/15
                        "
                      />
                    </FormControl>

                    <FormDescription className="text-xs">
                      Pole wymagane
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TAGS */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => {
                  const selectedTagIds: string[] = field.value ?? [];

                  const selectedTagObjects = tags.filter((tag) =>
                    selectedTagIds.includes(tag.id),
                  );

                  const toggleTag = (tagId: string) => {
                    const isSelected = selectedTagIds.includes(tagId);

                    const nextTags = isSelected
                      ? selectedTagIds.filter((id) => id !== tagId)
                      : [...selectedTagIds, tagId];

                    field.onChange(nextTags);
                  };

                  const removeTag = (tagId: string) => {
                    field.onChange(selectedTagIds.filter((id) => id !== tagId));
                  };

                  return (
                    <FormItem className="mt-6 border-t pt-5">
                      {/* TAG HEADER */}
                      <div className="mb-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Tags className="size-3.5 text-muted-foreground" />

                          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Tagi
                          </label>
                        </div>

                        {selectedTagObjects.length > 0 && (
                          <span className="text-[11px] tabular-nums text-muted-foreground">
                            {selectedTagObjects.length}
                          </span>
                        )}
                      </div>

                      {/* SELECTED TAGS */}
                      {selectedTagObjects.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedTagObjects.map((tag) => (
                            <span
                              key={tag.id}
                              className="
    inline-flex
    items-center
    gap-1.5
    rounded-lg
    border
    bg-muted/40
    px-2.5
    py-1.5
    text-xs
    font-medium
    text-foreground
  "
                            >
                              {tag.name}

                              <button
                                type="button"
                                onClick={() => removeTag(tag.id)}
                                className="
      -mr-1
      rounded-md
      p-0.5
      text-muted-foreground
      transition-colors
      hover:bg-muted
      hover:text-foreground
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-ring/20
    "
                                aria-label={`Usuń tag ${tag.name}`}
                              >
                                <X className="size-3.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="
    flex
    h-[30px]
    items-center
    rounded-md
    border
    border-dashed
    bg-muted/20
    px-3
    text-xs
    text-muted-foreground
  "
                        >
                          Nie dodano jeszcze żadnych tagów.
                        </div>
                      )}

                      {/* ADD TAG */}
                      <div className="mt-2.5">
                        <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="
                                inline-flex
                                h-8
                                items-center
                                gap-1.5
                                rounded-md
                                border
                                border-dashed
                                px-2.5
                                text-xs
                                font-medium
                                text-muted-foreground
                                transition-colors
                                hover:border-border
                                hover:bg-accent/40
                                hover:text-foreground
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-ring/15
                              "
                            >
                              <Tags className="size-3.5" />
                              Dodaj tag
                            </button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="start"
                            sideOffset={6}
                            className="
                              w-[var(--radix-popover-trigger-width)]
                              min-w-[280px]
                              p-0
                              sm:w-[340px]
                            "
                          >
                            <Command>
                              <CommandInput placeholder="Wyszukaj tag..." />

                              <CommandList className="scrollbar-custom">
                                <CommandEmpty>
                                  Brak tagów spełniających kryteria
                                  wyszukiwania.
                                </CommandEmpty>

                                <CommandGroup className="p-1.5">
                                  {tags.map((tag) => {
                                    const isSelected = selectedTagIds.includes(
                                      tag.id,
                                    );

                                    return (
                                      <CommandItem
                                        key={tag.id}
                                        value={tag.name}
                                        onSelect={() => toggleTag(tag.id)}
                                        className="
                                          flex
                                          cursor-pointer
                                          items-center
                                          gap-3
                                          rounded-lg
                                          px-3
                                          py-2.5
                                        "
                                      >
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                          <Tags className="size-4" />
                                        </span>

                                        <span className="min-w-0 flex-1 truncate font-medium">
                                          {tag.name}
                                        </span>

                                        <CheckIcon
                                          className={cn(
                                            "size-4 text-primary transition-opacity",
                                            isSelected
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <FormDescription className="mt-2 text-xs">
                        Wybierz co najmniej jeden tag opisujący artykuł.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </section>

          {/* RESPONSE */}
          <section className="overflow-hidden rounded-xl border bg-card">
            <div className="border-b px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">
                    Odpowiedź dla użytkownika
                  </h2>

                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    Treść odpowiedzi, którą pracownik może przekazać
                    użytkownikowi.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <VariantCard />
            </div>
          </section>

          {/* INFO */}
          <div className="flex items-start gap-3 rounded-xl border border-dashed bg-muted/20 px-4 py-3.5">
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <p className="text-xs leading-5 text-muted-foreground">
              Po utworzeniu artykułu będzie można go edytować oraz dodawać
              kolejne warianty odpowiedzi.
            </p>
          </div>
        </main>

        {/* ============================================================
            SIDEBAR
        ============================================================ */}
        <aside className="min-w-0 space-y-6 xl:sticky xl:top-6">
          {/* ARTICLE METADATA */}
          <section className="overflow-hidden rounded-xl border bg-card">
            <div className="border-b px-5 py-4">
              <h2 className="text-sm font-semibold">Informacje o artykule</h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Uzupełnij dane potrzebne do organizacji artykułu.
              </p>
            </div>

            <div className="space-y-5 p-5">
              {/* PRODUCT */}
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => {
                  const selectedProduct = products.find(
                    (product) => product.value === field.value,
                  );

                  return (
                    <FormItem>
                      <label className="mb-2 block text-sm font-medium">
                        Produkt
                      </label>

                      <Popover open={productOpen} onOpenChange={setProductOpen}>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              role="combobox"
                              aria-expanded={productOpen}
                              className={cn(
                                "flex h-11 w-full items-center gap-3 rounded-lg",
                                "border border-border bg-background px-3",
                                "text-sm transition-colors",
                                "hover:bg-accent/40",
                                "focus-visible:outline-none",
                                "focus-visible:ring-2",
                                "focus-visible:ring-ring/15",
                              )}
                            >
                              {selectedProduct ? (
                                <>
                                  <span
                                    className="flex size-7 shrink-0 items-center justify-center rounded-md border"
                                    style={{
                                      borderColor: selectedProduct.color
                                        ? `${selectedProduct.color}35`
                                        : undefined,
                                      backgroundColor: selectedProduct.color
                                        ? `${selectedProduct.color}12`
                                        : undefined,
                                    }}
                                  >
                                    <Box
                                      className="size-4"
                                      style={{
                                        color: selectedProduct.color,
                                      }}
                                    />
                                  </span>

                                  <span className="min-w-0 flex-1 truncate text-left font-medium">
                                    {selectedProduct.label}
                                  </span>
                                </>
                              ) : (
                                <span className="flex-1 text-left text-muted-foreground">
                                  Wybierz produkt...
                                </span>
                              )}

                              <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                            </button>
                          </PopoverTrigger>
                        </FormControl>

                        <PopoverContent
                          align="start"
                          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0"
                        >
                          <Command>
                            <CommandInput placeholder="Wyszukaj produkt..." />

                            <CommandList className="scrollbar-custom">
                              <CommandEmpty>
                                Brak produktu spełniającego kryteria
                                wyszukiwania.
                              </CommandEmpty>

                              <CommandGroup className="p-1.5">
                                {products.map((product) => {
                                  const isSelected =
                                    field.value === product.value;

                                  return (
                                    <CommandItem
                                      key={product.value}
                                      value={product.label}
                                      onSelect={() => {
                                        field.onChange(product.value);
                                        onProductChange(product.value);
                                        setProductOpen(false);
                                      }}
                                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5"
                                    >
                                      <span
                                        className="flex size-7 shrink-0 items-center justify-center rounded-md border"
                                        style={{
                                          borderColor: product.color
                                            ? `${product.color}35`
                                            : undefined,
                                          backgroundColor: product.color
                                            ? `${product.color}12`
                                            : undefined,
                                        }}
                                      >
                                        <Box
                                          className="size-4"
                                          style={{
                                            color: product.color,
                                          }}
                                        />
                                      </span>

                                      <span className="min-w-0 flex-1 truncate font-medium">
                                        {product.label}
                                      </span>

                                      <CheckIcon
                                        className={cn(
                                          "size-4 text-primary transition-opacity",
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormDescription className="text-xs">
                        Produkt, którego dotyczy artykuł.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* CATEGORY */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  const selectedCategory = categories.find(
                    (category) => category.value === field.value,
                  );

                  return (
                    <FormItem>
                      <label className="mb-2 block text-sm font-medium">
                        Kategoria
                      </label>

                      <Popover
                        open={categoryOpen}
                        onOpenChange={setCategoryOpen}
                      >
                        <FormControl>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              role="combobox"
                              aria-expanded={categoryOpen}
                              disabled={!categories.length}
                              className={cn(
                                "flex h-11 w-full items-center gap-3 rounded-lg",
                                "border border-border bg-background px-3",
                                "text-sm transition-colors",
                                "hover:bg-accent/40",
                                "focus-visible:outline-none",
                                "focus-visible:ring-2",
                                "focus-visible:ring-ring/15",
                                "disabled:cursor-not-allowed disabled:opacity-50",
                              )}
                            >
                              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                <FolderTree className="size-4" />
                              </span>

                              {selectedCategory ? (
                                <span className="min-w-0 flex-1 truncate text-left font-medium">
                                  {selectedCategory.label}
                                </span>
                              ) : (
                                <span className="flex-1 text-left text-muted-foreground">
                                  {categories.length
                                    ? "Wybierz kategorię..."
                                    : "Najpierw wybierz produkt"}
                                </span>
                              )}

                              <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
                            </button>
                          </PopoverTrigger>
                        </FormControl>

                        <PopoverContent
                          align="start"
                          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0"
                        >
                          <Command>
                            <CommandInput placeholder="Wyszukaj kategorię..." />

                            <CommandList className="scrollbar-custom">
                              <CommandEmpty>
                                Brak kategorii spełniających kryteria
                                wyszukiwania.
                              </CommandEmpty>

                              <CommandGroup className="p-1.5">
                                {categories.map((category) => {
                                  const isSelected =
                                    field.value === category.value;

                                  return (
                                    <CommandItem
                                      key={category.value}
                                      value={category.label}
                                      onSelect={() => {
                                        field.onChange(category.value);
                                        setCategoryOpen(false);
                                      }}
                                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5"
                                    >
                                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                        <FolderTree className="size-4" />
                                      </span>

                                      <span className="min-w-0 flex-1 truncate font-medium">
                                        {category.label}
                                      </span>

                                      <CheckIcon
                                        className={cn(
                                          "size-4 text-primary transition-opacity",
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormDescription className="text-xs">
                        Kategoria jest zależna od wybranego produktu.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </section>

          {/* INTERNAL NOTE */}
          {/* INTERNAL NOTE */}
          <section className="rounded-xl border bg-card">
            <div className="border-b px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">
                    Notatka dla pracownika
                  </h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Informacje widoczne tylko wewnętrznie.
                  </p>
                </div>

                <span className="shrink-0 text-[11px] text-muted-foreground">
                  Opcjonalnie
                </span>
              </div>
            </div>

            <div className="p-5">
              <FormField
                control={form.control}
                name="internalNote"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Dodaj wewnętrzne informacje, wskazówki lub dodatkowy kontekst..."
                        className="
                min-h-[190px]
                resize-y
                rounded-lg
                bg-background
                px-3
                py-2.5
                text-sm
                leading-5
                shadow-none
                placeholder:text-muted-foreground/50
                focus-visible:ring-2
                focus-visible:ring-ring/15
              "
                      />
                    </FormControl>

                    <FormDescription className="text-xs leading-5">
                      Notatka nie jest częścią odpowiedzi przekazywanej
                      użytkownikowi.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
