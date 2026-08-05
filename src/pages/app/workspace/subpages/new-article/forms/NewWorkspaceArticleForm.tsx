import { FileText, FolderKanban, Type } from "lucide-react";
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

export const ARTICLE_MARKERS = [
  { value: "red", label: "Czerwony", color: "bg-red-500" },
  { value: "yellow", label: "Żółty", color: "bg-yellow-500" },
  { value: "green", label: "Zielony", color: "bg-green-500" },
  { value: "blue", label: "Niebieski", color: "bg-blue-500" },
];

export const WorkspaceArticleForm = ({
  folders = [],
}: WorkspaceArticleFormProps) => {
  const form = useFormContext();

  return (
    <div className="w-full mx-auto space-y-10">
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
          description="Ustaw lokalizację i oznaczenie artykułu"
        />

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
                          <div className="flex  items-center gap-2">
                            <div>📁</div>
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

        <Row
          title="Marker"
          description="Kolorowe oznaczenie artykułu"
          right={
            <FormField
              control={form.control}
              name="marker"
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
                        <SelectValue placeholder="Brak oznaczenia" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="none">Brak</SelectItem>

                      {ARTICLE_MARKERS.map((marker) => (
                        <SelectItem key={marker.value} value={marker.value}>
                          <div className="flex items-center gap-2">
                            <span
                              className={`
                                h-3
                                w-3
                                rounded-full
                                ${marker.color}
                              `}
                            />

                            {marker.label}
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

    <div className="w-[40%] flex justify-end">{right}</div>
  </div>
);

const Divider = () => <div className="h-px bg-border mx-6" />;
