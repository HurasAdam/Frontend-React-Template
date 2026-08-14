import { Check, FolderPlus, Loader2, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
export type FolderColor =
  | "slate"
  | "blue"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "teal"
  | "orange";

export const FOLDER_COLORS: {
  value: FolderColor;
  label: string;
  accentClass: string;
  softClass: string;
  headerClass: string;
}[] = [
  {
    value: "slate",
    label: "Grafit",
    accentClass: "bg-slate-600",
    softClass: "bg-slate-500/10",
    headerClass: "from-slate-500/15",
  },
  {
    value: "blue",
    label: "Błękit",
    accentClass: "bg-blue-600",
    softClass: "bg-blue-500/10",
    headerClass: "from-blue-500/15",
  },
  {
    value: "violet",
    label: "Fiolet",
    accentClass: "bg-violet-600",
    softClass: "bg-violet-500/10",
    headerClass: "from-violet-500/15",
  },
  {
    value: "emerald",
    label: "Szmaragd",
    accentClass: "bg-emerald-600",
    softClass: "bg-emerald-500/10",
    headerClass: "from-emerald-500/15",
  },
  {
    value: "teal",
    label: "Turkus",
    accentClass: "bg-teal-600",
    softClass: "bg-teal-500/10",
    headerClass: "from-teal-500/15",
  },
  {
    value: "amber",
    label: "Bursztyn",
    accentClass: "bg-amber-500",
    softClass: "bg-amber-500/10",
    headerClass: "from-amber-500/15",
  },
  {
    value: "orange",
    label: "Pomarańcz",
    accentClass: "bg-orange-600",
    softClass: "bg-orange-500/10",
    headerClass: "from-orange-500/15",
  },
  {
    value: "rose",
    label: "Róż",
    accentClass: "bg-rose-600",
    softClass: "bg-rose-500/10",
    headerClass: "from-rose-500/15",
  },
];

const DEFAULT_FOLDER_COLOR = {
  value: "blue" as const,
  label: "Błękit",
  accentClass: "bg-blue-600",
  softClass: "bg-blue-500/10",
  headerClass: "from-blue-500/15",
};

export const getFolderColorClasses = (color: FolderColor) =>
  FOLDER_COLORS.find((option) => option.value === color) ??
  DEFAULT_FOLDER_COLOR;

export interface IFolderFormData {
  name: string;
  description: string;
  color: FolderColor;
}

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSave: (data: IFolderFormData) => Promise<unknown>;
};

export const AddWorkspaceFolderModal = ({
  isOpen,
  isPending,
  onClose,
  onSave,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<IFolderFormData>({
    defaultValues: { name: "", description: "", color: "blue" },
  });

  const color = watch("color");
  const name = watch("name");
  const selectedColor = getFolderColorClasses(color);

  const onSubmit = async (data: IFolderFormData) => {
    await onSave(data);
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[560px]">
        {/* Header */}
        <div
          className={cn(
            "relative border-b border-border/60 bg-linear-to-br to-transparent px-8 pt-8 pb-7",
            selectedColor.headerClass,
          )}
        >
          <DialogHeader className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-2xl text-white shadow-sm transition-colors duration-300",
                  selectedColor.accentClass,
                )}
              >
                <FolderPlus className="size-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur">
                <Sparkles className="size-3" />
                NOWY FOLDER
              </span>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-[26px] leading-tight font-semibold tracking-[-0.03em]">
                Dodaj folder
              </DialogTitle>
              <DialogDescription className="max-w-md text-[14px] leading-6">
                Uporządkuj artykuły w kolekcji i przypisz folderowi kolor, aby
                szybciej go rozpoznać.
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7">
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="folder-name"
                className="text-[13px] font-medium text-foreground"
              >
                Nazwa folderu
              </label>
              <Input
                id="folder-name"
                autoFocus
                className={cn(
                  "h-11 rounded-xl bg-background/60",
                  errors.name &&
                    "border-destructive focus-visible:ring-destructive/30",
                )}
                placeholder="np. Szablony pism"
                {...register("name", { required: true, maxLength: 60 })}
              />
              {errors.name ? (
                <p className="text-xs text-destructive">
                  Podaj nazwę folderu (maks. 60 znaków).
                </p>
              ) : null}
            </div>

            {/* Color picker */}
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <label className="text-[13px] font-medium text-foreground">
                  Kolor folderu
                </label>
                <span className="text-xs text-muted-foreground">
                  {FOLDER_COLORS.find((c) => c.value === color)?.label}
                </span>
              </div>

              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <div
                    role="radiogroup"
                    aria-label="Kolor folderu"
                    className="flex flex-wrap gap-2.5"
                  >
                    {FOLDER_COLORS.map((option) => {
                      const selected = field.value === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          aria-label={option.label}
                          title={option.label}
                          onClick={() => field.onChange(option.value)}
                          className={cn(
                            "relative flex size-9 items-center justify-center rounded-xl ring-offset-2 ring-offset-card transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            option.accentClass,
                            selected
                              ? "scale-105 shadow-md ring-2"
                              : "ring-1 ring-border/70",
                          )}
                        >
                          {selected ? (
                            <Check className="size-4 text-white drop-shadow" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                )}
              />

              {/* Live preview */}
              <div
                className={cn(
                  "mt-1 flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3",
                  selectedColor.softClass,
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl text-white",
                    selectedColor.accentClass,
                  )}
                >
                  <FolderPlus className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {name?.trim() || "Nazwa folderu"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Podgląd w kolekcji
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="folder-description"
                className="text-[13px] font-medium text-foreground"
              >
                Opis{" "}
                <span className="font-normal text-muted-foreground">
                  (opcjonalnie)
                </span>
              </label>
              <Textarea
                id="folder-description"
                rows={4}
                className="resize-none rounded-xl bg-background/60"
                placeholder="Krótki opis zawartości folderu..."
                {...register("description")}
              />
            </div>
          </div>

          <div className="mt-7 -mx-8 -mb-7 flex justify-end gap-3 border-t border-border/60 bg-muted/30 px-8 py-5">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-xl"
              onClick={onClose}
            >
              Anuluj
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              className="rounded-xl px-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Dodawanie...
                </>
              ) : (
                "Dodaj folder"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
