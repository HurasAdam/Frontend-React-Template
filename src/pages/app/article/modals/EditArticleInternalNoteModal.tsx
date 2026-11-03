/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Loader2, MessageSquareText, Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export interface IEditArticleInternalNoteFormData {
  note: string;
}

type Props = {
  open: boolean;
  closeOnOutsideClick?: boolean;
  note: string;
  isPending: boolean;
  onClose: () => void;
  onSave: (payload: { internalNote: string }) => Promise<unknown>;
};

const MAX_NOTE_LENGTH = 2000;

export const EditArticleInternalNoteModal = ({
  open,
  closeOnOutsideClick,
  note,
  isPending,
  onClose,
  onSave,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm<IEditArticleInternalNoteFormData>({
    defaultValues: {
      note,
    },
  });

  const currentNote = watch("note") ?? "";
  const isSaving = isPending || isSubmitting;

  useEffect(() => {
    reset({
      note,
    });
  }, [note, reset]);

  const handleClose = () => {
    if (isSaving) return;

    reset({
      note,
    });

    onClose();
  };

  const onSubmit = async (data: IEditArticleInternalNoteFormData) => {
    await onSave({ internalNote: data.note });
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
        className="max-h-[90vh] gap-0 overflow-x-hidden overflow-y-auto rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[640px]"
      >
        {/* Header */}
        <div className="relative border-b border-border/60 bg-linear-to-br from-violet-500/10 to-transparent px-8 pb-6 pt-7">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <MessageSquareText className="size-[18px]" />
              </div>

              <DialogTitle className="text-[23px] font-semibold leading-tight tracking-[-0.025em]">
                Edytuj notatkę dla pracownika
              </DialogTitle>
            </div>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="article-internal-note"
                className="text-[13px] font-medium text-foreground"
              >
                Treść notatki
              </label>

              <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                {currentNote.length}/{MAX_NOTE_LENGTH}
              </span>
            </div>

            <Textarea
              id="article-internal-note"
              placeholder="Wpisz krótką informację dla pozostałych pracowników..."
              disabled={isSaving}
              maxLength={MAX_NOTE_LENGTH}
              className="min-h-[180px] max-h-[300px] resize-y rounded-xl border-border/70 bg-background/60 px-4 py-3.5 text-sm leading-6 shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/15"
              {...register("note")}
            />

            <p className="text-xs leading-5 text-muted-foreground">
              Notatka jest przeznaczona wyłącznie dla pracowników Helpdesku. Nie
              stanowi części odpowiedzi przekazywanej klientowi.
            </p>
          </div>

          {/* Footer */}
          <div className="-mx-8 -mb-7 mt-7 flex justify-end gap-3 border-t border-border/60 bg-muted/30 px-8 py-5">
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
              className="gap-2 rounded-xl px-6"
              disabled={isSaving || !isDirty}
            >
              {isSaving ? (
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
