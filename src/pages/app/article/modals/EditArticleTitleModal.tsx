/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { FileText, Loader2, Pencil, Type } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface IEditArticleTitleFormData {
  title: string;
}

type Props = {
  open: boolean;
  closeOnOutsideClick?: boolean;
  title: string;
  isPending: boolean;
  onClose: () => void;
  onSave: (data: IEditArticleTitleFormData) => Promise<unknown>;
};

export const EditArticleTitleModal = ({
  open,
  closeOnOutsideClick,
  title,
  isPending,
  onClose,
  onSave,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<IEditArticleTitleFormData>({
    defaultValues: {
      title,
    },
  });

  const currentTitle = watch("title");

  useEffect(() => {
    reset({
      title,
    });
  }, [title, reset]);

  const onSubmit = async (data: IEditArticleTitleFormData) => {
    await onSave({ title: data.title });

    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset({
            title,
          });

          onClose();
        }
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
        className="max-h-[90vh] gap-0 overflow-x-hidden overflow-y-auto rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[520px]"
      >
        {/* Header */}
        <div className="relative border-b border-border/60 bg-linear-to-br from-violet-500/10 to-transparent px-8 pb-6 pt-7">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <Type className="size-[18px]" />
              </div>

              <span className="text-[23px] font-semibold leading-tight tracking-[-0.025em]">
                Edytuj tytuł artykułu
              </span>
            </div>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="article-title"
                className="text-[13px] font-medium text-foreground"
              >
                Tytuł artykułu
              </label>

              <span className="text-[11px] tabular-nums text-muted-foreground">
                {currentTitle?.length ?? 0}/120
              </span>
            </div>

            <Input
              id="article-title"
              autoFocus
              placeholder="Np. Jak zmienić hasło ucznia?"
              className={cn(
                "h-12 rounded-xl bg-background/60 text-sm",
                errors.title &&
                  "border-destructive focus-visible:ring-destructive/30",
              )}
              maxLength={120}
              {...register("title", {
                required: "Tytuł artykułu jest wymagany.",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Tytuł artykułu nie może być pusty.",
                maxLength: {
                  value: 120,
                  message: "Tytuł może mieć maksymalnie 120 znaków.",
                },
              })}
            />

            {errors.title ? (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            ) : (
              <p className="text-xs leading-5 text-muted-foreground">
                Postaw na krótki, konkretny tytuł opisujący problem lub
                wykonywaną czynność.
              </p>
            )}
          </div>

          {/* Preview */}
          <div className="mt-6 w-full min-w-0 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5">
            <div className="flex w-full min-w-0 items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background text-muted-foreground">
                <FileText className="size-4" />
              </div>

              <div className="w-0 min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Podgląd tytułu
                </p>

                <p className="mt-1 whitespace-normal text-sm font-medium leading-5 text-foreground [overflow-wrap:anywhere]">
                  {currentTitle?.trim() || "Tytuł artykułu"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="-mx-8 -mb-7 mt-7 flex justify-end gap-3 border-t border-border/60 bg-muted/30 px-8 py-5">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-xl"
              onClick={() => {
                reset({
                  title,
                });
                onClose();
              }}
            >
              Anuluj
            </Button>

            <Button
              type="submit"
              size="lg"
              className="gap-2 rounded-xl px-6"
              disabled={isPending || !isDirty}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  Zapisz zmiany
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
