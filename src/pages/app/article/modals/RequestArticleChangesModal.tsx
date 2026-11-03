import {
  AlertCircle,
  FilePenLine,
  Loader2,
  MessageSquareText,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface FormValues {
  reviewNote: string;
}

interface Props {
  isOpen: boolean;
  articleTitle: string;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (note: string) => Promise<void>;
}

const MAX_NOTE_LENGTH = 2000;

export function RequestArticleChangesModal({
  isOpen,
  articleTitle,
  isPending,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      reviewNote: "",
    },
  });

  const note = watch("reviewNote") ?? "";
  const isSaving = isPending || isSubmitting;

  useEffect(() => {
    if (isOpen) {
      reset({ reviewNote: "" });
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    if (isSaving) return;

    reset({ reviewNote: "" });
    onClose();
  };

  const submitForm = async (values: FormValues) => {
    const trimmedNote = values.reviewNote.trim();
    console.log("D", trimmedNote);
    try {
      await onSubmit(trimmedNote);
      reset({ reviewNote: "" });
    } catch {
      // Obsługa błędu pozostaje po stronie hooka mutacji.
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[720px]">
        {/* Header */}
        <div className="border-b border-border/60 px-7 pb-6 pt-7 sm:px-8 sm:pt-8">
          <DialogHeader className="space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-amber-500/15 bg-amber-500/10 text-amber-600">
                <MessageSquareText className="size-5" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
                <ShieldCheck className="size-3.5" />
                WERYFIKACJA ARTYKUŁU
              </span>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-[25px] font-semibold leading-tight tracking-[-0.035em]">
                Przekaż uwagi
              </DialogTitle>

              <DialogDescription className="max-w-[480px] text-[14px] leading-6">
                Wskaż obszary wymagające poprawy lub uzupełnienia
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-5 px-7 py-6 sm:px-8 sm:py-7">
            {/* Article context */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm">
                <FilePenLine className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Weryfikowany artykuł
                </p>

                <p className="break-words text-sm font-semibold leading-5 text-foreground">
                  {articleTitle}
                </p>
              </div>
            </div>

            {/* Feedback field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="article-change-note"
                  className="text-sm font-semibold text-foreground"
                >
                  Co należy poprawić?
                </label>

                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {note.length}/{MAX_NOTE_LENGTH}
                </span>
              </div>

              <Textarea
                id="article-change-note"
                placeholder="Np. uzupełnij instrukcję o brakujące kroki i doprecyzuj, w których miejscach w systemie należy wprowadzić zmiany..."
                disabled={isSaving}
                maxLength={MAX_NOTE_LENGTH}
                aria-invalid={Boolean(errors.reviewNote)}
                className="min-h-[170px] max-h-[170px] resize-y rounded-2xl border-border/70 bg-background px-4 py-3.5 text-sm leading-6 shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/15"
                {...register("reviewNote", {
                  required: "Wpisz uwagi dla autora.",
                  validate: (value) =>
                    value.trim().length > 0 || "Wpisz uwagi dla autora.",
                })}
              />

              {errors.reviewNote ? (
                <p className="flex items-start gap-1.5 text-xs leading-5 text-destructive">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  {errors.reviewNote.message}
                </p>
              ) : (
                <p className="text-xs leading-5 text-muted-foreground">
                  Opisz konkretnie, co wymaga zmiany i dlaczego.
                </p>
              )}
            </div>

            {/* Informational notice */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-3.5 py-3">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />

              <p className="text-xs leading-5 text-muted-foreground">
                Treść uwag będą widoczna dla wszystkich pracowników mających
                dostęp do artykułu.
              </p>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex-col-reverse border-t border-border/60 bg-muted/30 px-7 py-5 sm:flex-row sm:items-center sm:px-8">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-xl"
              disabled={isSaving}
              onClick={handleClose}
            >
              Anuluj
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={isSaving || note.trim().length === 0}
              className="rounded-xl px-5"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Wysyłanie uwag...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Przekaż uwagi
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
