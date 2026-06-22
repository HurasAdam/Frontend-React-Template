import {
  Box,
  CheckIcon,
  ChevronsUpDownIcon,
  FileText,
  FolderTree,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Textarea } from "../../../../components/ui/textarea";
import { cn } from "../../../../lib/utils";
import { FormCard } from "./FormCard";
import { FormSection } from "./FormSection";

export const AddArticleForm = ({
  products,
  categories,
  tags,
  onProductChange,
}) => {
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "responseTemplates",
  });

  return (
    <Form {...form}>
      <form className="w-full mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileText size={18} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Nowy artykuł</h1>
            <p className="text-sm text-muted-foreground">
              Tworzenie wpisu w bazie wiedzy
            </p>
          </div>
        </div>

        {/* ================= BASIC ================= */}
        <FormCard>
          <FormSection title="Podstawowe informacje">
            <div className="px-6 py-5 space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Wprowadź tytuł artykułu..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="employeeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Wprowadź uwagi dla pracownika..."
                          {...field}
                          className="min-h-[175px] border-input"
                        />
                      </FormControl>
                      <FormDescription className="text-[13px]">
                        Notatka dla pracowników
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </FormSection>
        </FormCard>

        {/* ================= VARIANTS ================= */}
        <FormCard>
          <FormSection
            title="Warianty odpowiedzi (dla klienta)"
            action={
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  append({
                    version: fields.length + 1,
                    variantName: "",
                    variantContent: "",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj
              </Button>
            }
          >
            {/* <div className="px-6 py-5 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border bg-card p-5 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Wariant #{index + 1}</p>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Input
                    placeholder="Nazwa wariantu"
                    {...register(
                      `responseTemplates.${index}.variantName` as const,
                    )}
                  />

                  <Textarea
                    rows={5}
                    placeholder="Treść odpowiedzi"
                    {...register(
                      `responseTemplates.${index}.variantContent` as const,
                    )}
                  />
                </div>
              ))}
            </div> */}
          </FormSection>
        </FormCard>

        {/* ================= SETTINGS ================= */}
        <FormCard>
          <FormSection title="Ustawienia publikacji">
            <div className="px-6 py-5">
              <div className="space-y-8">
                {/* ===================================================== */}
                {/* Produkt */}
                {/* ===================================================== */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-primary" />

                      <h3 className="text-sm font-medium text-foreground">
                        Produkt
                      </h3>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Określa obszar wiedzy, którego dotyczy artykuł.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <Popover open={open} onOpenChange={setOpen}>
                            <FormControl>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  aria-label="product combobox"
                                  className="w-full justify-between bg-transparent"
                                >
                                  {field.value.value ? (
                                    products.find(
                                      (method) =>
                                        method.label === field.value.label,
                                    )?.label
                                  ) : (
                                    <span className="text-muted-foreground">
                                      Wybierz produkt...
                                    </span>
                                  )}

                                  <ChevronsUpDownIcon className="opacity-50" />
                                </Button>
                              </PopoverTrigger>
                            </FormControl>

                            <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
                              <Command>
                                <CommandInput placeholder="Wyszukaj produkt..." />

                                <CommandList className="scrollbar-custom">
                                  <CommandEmpty>
                                    Brak wyników spełniających kryteria
                                    wyszukiwania
                                  </CommandEmpty>

                                  <CommandGroup>
                                    {products.map((method) => (
                                      <CommandItem
                                        key={method.value}
                                        value={method.label}
                                        onSelect={() => {
                                          setProductValue(method.value);
                                          field.onChange(method);
                                          onProductChange(method.value);
                                          setOpen(false);
                                        }}
                                        className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-accent/60"
                                      >
                                        <div
                                          className="flex items-center justify-center w-7 h-7 rounded-xl border shadow-sm"
                                          style={{
                                            borderColor: `${method.color}35`,
                                            backgroundColor: `${method.color}35`,
                                          }}
                                        >
                                          <Box
                                            size={18}
                                            style={{ color: method.color }}
                                          />
                                        </div>

                                        <span className="font-medium">
                                          {method.label}
                                        </span>

                                        <CheckIcon
                                          className={cn(
                                            "ml-auto transition-opacity text-primary",
                                            productValue === method.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* ===================================================== */}
                {/* Kategoria */}
                {/* ===================================================== */}
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-primary" />

                      <h3 className="text-sm font-medium text-foreground">
                        Kategoria
                      </h3>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Lista kategorii zależy od wybranego produktu.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Popover
                          open={openCategories}
                          onOpenChange={setOpenCategories}
                        >
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCategories}
                                aria-label="category combobox"
                                className="w-full justify-between bg-transparent"
                              >
                                {field.value.value ? (
                                  categories.find(
                                    (method) =>
                                      method.label === field.value.label,
                                  )?.label
                                ) : (
                                  <span className="text-muted-foreground">
                                    Wybierz kategorię...
                                  </span>
                                )}

                                <ChevronsUpDownIcon className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>

                          <PopoverContent
                            className="w-(--radix-popper-anchor-width) p-0"
                            side="bottom"
                            align="start"
                            avoidCollisions={false}
                          >
                            <Command>
                              <CommandInput placeholder="Wyszukaj kategorię..." />

                              <CommandList className="scrollbar-custom">
                                <CommandEmpty>
                                  Brak kategorii spełniających kryteria
                                  wyszukiwania
                                </CommandEmpty>

                                <CommandGroup>
                                  {categories.map((option) => (
                                    <CommandItem
                                      key={option.value}
                                      value={option.label}
                                      onSelect={() => {
                                        field.onChange(option);
                                        setCategoryValue(option.value);
                                        setOpenCategories(false);
                                      }}
                                      className={cn(
                                        "group flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                                        categoryValue === option.value
                                          ? "bg-card shadow-sm"
                                          : "hover:bg-accent/10",
                                      )}
                                    >
                                      <FolderTree
                                        size={14}
                                        className="text-muted-foreground"
                                      />

                                      <span className="font-medium truncate">
                                        {option.label}
                                      </span>

                                      <CheckIcon
                                        className={cn(
                                          "ml-auto w-4 h-4 transition-opacity",
                                          categoryValue === option.value
                                            ? "opacity-100 text-primary"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </FormSection>
        </FormCard>

        {/* ================= TAGS ================= */}
        <FormCard>
          <FormSection title="Tagi">
            <div className="px-6 py-5 space-y-4">
              <Input placeholder="Dodaj tag..." />

              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </FormSection>
        </FormCard>
      </form>
    </Form>
  );
};
