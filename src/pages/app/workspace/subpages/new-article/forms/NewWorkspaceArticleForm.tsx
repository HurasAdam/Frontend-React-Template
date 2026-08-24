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

interface WorkspaceArticleFormProps {
  folders: unknown[];
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
    <div className="mx-auto w-full space-y-10">
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
          description="Lokalizacja artykułu w strukturze workspace"
          right={
            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem className="w-[260px]">
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-60">
                        <SelectValue placeholder="Wybierz folder" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="px-1 py-1.5">
                      {folders.map((folder: any) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          <div className="flex items-center gap-2">
                            <span>📁</span>
                            {folder.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
