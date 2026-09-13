import { FileText, FolderKanban, Star, TrendingUp, Type } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VariantCard } from "../components/VariantCard";

interface WorkspaceFolder {
  id: string;
  name: string;
}

interface WorkspaceArticleFormProps {
  folders: WorkspaceFolder[];
}

export const ARTICLE_LABELS = [
  {
    value: "important",
    label: "Ważne",
    description: "Wyróżnij artykuł jako ważny",
    icon: Star,
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  {
    value: "popular",
    label: "Popularne",
    description: "Artykuł często wykorzystywany",
    icon: TrendingUp,
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
];

export const WorkspaceArticleForm = ({
  folders = [],
}: WorkspaceArticleFormProps) => {
  const form = useFormContext();

  return (
    <div className="mx-auto w-full space-y-7">
      {/* TITLE */}

      <Card>
        <Section
          icon={<Type size={16} />}
          title="Podstawowe dane"
          description="Informacje identyfikujące artykuł"
        />

        <div className="px-6 py-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Wprowadź nazwę artykułu"
                    className="
                      h-11
                      bg-background
                      focus-visible:ring-primary/30
                    "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* CONFIGURATION */}

      <Card>
        <Section
          icon={<FolderKanban size={16} />}
          title="Konfiguracja"
          description="Ustaw lokalizację i etykietę artykułu"
        />

        {/* FOLDER */}

        <Row
          title="Folder docelowy"
          description="Lokalizacja artykułu w strukturze kolekcji"
          right={
            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem className="w-[320px]">
                  <FormControl>
                    <FolderCombobox
                      folders={folders}
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          }
        />

        <Divider />

        {/* LABEL */}

        <Row
          title="Etykieta"
          description="Wyróżnij artykuł za pomocą etykiety"
          right={
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="w-[260px]">
                  <Select
                    value={field.value ?? "none"}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? undefined : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="w-60">
                        <SelectValue placeholder="Brak etykiety" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="px-1 py-1.5">
                      {/* NONE */}

                      <SelectItem value="none">
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <FileText className="size-3.5" />
                          </div>

                          <span>Brak etykiety</span>
                        </div>
                      </SelectItem>

                      {/* LABELS */}

                      {ARTICLE_LABELS.map((label) => {
                        const Icon = label.icon;

                        return (
                          <SelectItem key={label.value} value={label.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`
                                  flex
                                  size-6
                                  items-center
                                  justify-center
                                  rounded-md
                                  ${label.bg}
                                  ${label.text}
                                `}
                              >
                                <Icon className="size-3.5" />
                              </div>

                              <span>{label.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          }
        />
      </Card>

      {/* VARIANTS */}

      <Card>
        <Section
          icon={<FileText size={16} />}
          title="Szablon odpowiedzi"
          description="Wprowadź treść odpowiedzi dla użytkownika"
        />

        <div className="px-6 py-6">
          <VariantCard />
        </div>
      </Card>
    </div>
  );
};

/* ================= UI ================= */

const Section = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div
    className="
      flex
      items-center
      gap-3
      border-b
      bg-muted/40
      px-6
      py-4
    "
  >
    <div
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-primary/10
        text-primary
      "
    >
      {icon}
    </div>

    <div>
      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    className="
      overflow-hidden
      rounded-xl
      border
      bg-card
      shadow-sm
      transition
      hover:shadow-md
    "
  >
    {children}
  </div>
);

const Row = ({
  title,
  description,
  right,
}: {
  title: string;
  description: string;
  right: React.ReactNode;
}) => (
  <div className="flex items-center px-6 py-5">
    <div className="w-[60%] pr-6">
      <p className="text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>

    <div className="flex w-[40%] justify-end">{right}</div>
  </div>
);

const Divider = () => <div className="mx-6 h-px bg-border" />;

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface WorkspaceFolder {
  id: string;
  name: string;
}

interface FolderComboboxProps {
  folders: WorkspaceFolder[];
  selected?: string;
  onSelect: (id: string) => void;
}

interface WorkspaceFolder {
  id: string;
  name: string;
  color?: string;
}

interface FolderComboboxProps {
  folders: WorkspaceFolder[];
  selected?: string;
  onSelect: (id: string) => void;
}

interface WorkspaceFolder {
  id: string;
  name: string;
}

interface FolderComboboxProps {
  folders: WorkspaceFolder[];
  selected?: string;
  onSelect: (id: string) => void;
}

interface WorkspaceFolder {
  id: string;
  name: string;
}

interface FolderComboboxProps {
  folders: WorkspaceFolder[];
  selected?: string;
  onSelect: (id: string) => void;
}

interface WorkspaceFolder {
  id: string;
  name: string;
}

interface FolderComboboxProps {
  folders: WorkspaceFolder[];
  selected?: string;
  onSelect: (id: string) => void;
}

export function FolderCombobox({
  folders,
  selected,
  onSelect,
}: FolderComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedFolder = folders.find((folder) => folder.id === selected);

  const filteredFolders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return folders;
    }

    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(normalizedQuery),
    );
  }, [folders, query]);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (!next) {
          setQuery("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className={cn(
            "group flex h-11 w-full min-w-0 items-center gap-3",
            "rounded-lg border border-border",
            "bg-muted/40 px-3",
            "text-sm",
            "transition-all duration-150",
            "hover:border-ring/40 hover:bg-accent/30",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring/20",
            open && "border-ring/40 bg-accent/30",
          )}
        >
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center",
              "rounded-md border",
              "bg-muted/50",
              selectedFolder ? "border-border" : "border-transparent",
            )}
          >
            <span className="text-sm leading-none">📁</span>
          </span>

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              selectedFolder
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {selectedFolder?.name ?? "Wybierz folder"}
          </span>

          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground",
              "transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className={cn(
          "w-[var(--radix-popover-trigger-width)] min-w-[320px]",
          "overflow-hidden rounded-xl border-border/70",
          "bg-popover p-0 text-popover-foreground",
          "shadow-xl shadow-black/5",
        )}
      >
        <Command shouldFilter={false}>
          <div className="border-b border-border/60 px-3 py-2">
            <CommandInput
              placeholder="Szukaj folderu..."
              value={query}
              onValueChange={setQuery}
              className="
                  h-9
                  border-0
                  bg-transparent
                  px-2.5
                  text-sm
                  shadow-none
                  focus:ring-0
                "
            />
          </div>

          <CommandList className="scrollbar-custom max-h-[300px] overflow-y-auto p-2">
            <CommandEmpty className="py-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <span className="text-base leading-none">📁</span>
                </div>

                <div>
                  <p className="text-sm font-medium">Nie znaleziono folderu</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Spróbuj użyć innej nazwy.
                  </p>
                </div>
              </div>
            </CommandEmpty>

            <CommandGroup className="p-0">
              {filteredFolders.map((folder) => {
                const isSelected = selected === folder.id;

                return (
                  <CommandItem
                    key={folder.id}
                    value={folder.id}
                    onSelect={() => {
                      onSelect(folder.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "mb-1 last:mb-0",
                      "flex items-center gap-3",
                      "cursor-pointer",
                      "rounded-lg px-3 py-2.5",
                      "transition-colors",
                      "data-[selected=true]:bg-accent",
                      isSelected && "bg-primary/10",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center",
                        "rounded-md",
                        "transition-colors",
                        isSelected ? "bg-primary/15" : "bg-muted/40",
                      )}
                    >
                      <span className="text-sm leading-none">📁</span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-sm",
                          isSelected
                            ? "font-medium text-foreground"
                            : "text-foreground/90",
                        )}
                      >
                        {folder.name}
                      </span>
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
