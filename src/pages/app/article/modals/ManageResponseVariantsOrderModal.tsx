/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ArrowDown, ArrowUp, ListOrdered, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ResponseVariant = {
  id: string;
  variantName: string;
  description: string;
  order: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const INITIAL_VARIANTS: ResponseVariant[] = [
  {
    id: "variant-1",
    variantName: "Odpowiedź standardowa",
    description: "Podstawowa odpowiedź dla klienta",
    order: 0,
  },
  {
    id: "variant-2",
    variantName: "Odpowiedź szczegółowa",
    description: "Rozszerzona instrukcja dla klienta",
    order: 1,
  },
  {
    id: "variant-3",
    variantName: "Odpowiedź skrócona",
    description: "Krótka wersja odpowiedzi",
    order: 2,
  },
];

const getVariantLabel = (count: number) => {
  if (count === 1) return "wariant";
  if (count >= 2 && count <= 4) return "warianty";
  return "wariantów";
};

export const ManageResponseVariantsOrderModal = ({ open, onClose }: Props) => {
  const [variants, setVariants] = useState<ResponseVariant[]>(INITIAL_VARIANTS);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setVariants([...INITIAL_VARIANTS].sort((a, b) => a.order - b.order));
    }
  }, [open]);

  const isDirty = variants.some((variant, index) => variant.order !== index);

  const moveVariant = (index: number, direction: -1 | 1) => {
    setVariants((currentVariants) => {
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= currentVariants.length) {
        return currentVariants;
      }

      const reordered = [...currentVariants];

      [reordered[index], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[index],
      ];

      return reordered.map((variant, position) => ({
        ...variant,
        order: position,
      }));
    });
  };

  const handleCancel = () => {
    if (isSaving) return;

    setVariants([...INITIAL_VARIANTS].sort((a, b) => a.order - b.order));

    onClose();
  };

  const handleSave = async () => {
    if (!isDirty || isSaving) return;

    const payload = variants.map((variant, index) => ({
      variantId: variant.id,
      order: index,
    }));

    setIsSaving(true);

    try {
      // Mock zapisu - docelowo tutaj podepniemy mutację API.
      console.info("Nowa kolejność wariantów:", payload);

      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleCancel();
      }}
    >
      <DialogContent
        className="
          max-h-[90vh] gap-0 overflow-x-hidden overflow-y-auto
          rounded-[24px] border border-border/70 bg-card p-0
          shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)]
          sm:max-w-[620px]
        "
      >
        {/* Header */}
        <div
          className="
            border-b border-border/60
            bg-linear-to-br from-violet-500/10 to-transparent
            px-7 pb-6 pt-7 sm:px-8
          "
        >
          <DialogHeader className="text-left">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex size-10 shrink-0 items-center justify-center
                  rounded-xl bg-violet-600 text-white shadow-sm
                "
              >
                <ListOrdered className="size-[19px]" />
              </div>

              <div className="min-w-0 flex-1">
                <DialogTitle
                  className="
                    text-[22px] font-semibold leading-tight
                    tracking-[-0.025em]
                  "
                >
                  Zarządzaj kolejnością wariantów
                </DialogTitle>

                <DialogDescription
                  className="
                    mt-1.5 text-[13px] leading-5
                    text-muted-foreground
                  "
                >
                  Ustal kolejność wyświetlania odpowiedzi w artykule.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="space-y-5 px-7 py-6 sm:px-8">
          {/* Section heading */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium text-foreground">
                Kolejność wariantów
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Użyj strzałek, aby zmienić pozycję wariantu.
              </p>
            </div>

            <Badge
              variant="secondary"
              className="shrink-0 rounded-lg px-2.5 py-1 tabular-nums"
            >
              {variants.length} {getVariantLabel(variants.length)}
            </Badge>
          </div>

          {/* Variants list */}
          <div className="space-y-2.5">
            {variants.length > 0 ? (
              variants.map((variant, index) => {
                const isFirst = index === 0;
                const isLast = index === variants.length - 1;

                return (
                  <div
                    key={variant.id}
                    className="
                      flex items-center gap-3 rounded-xl border
                      border-border/70 bg-background px-4 py-3
                      transition-colors duration-200
                      hover:border-border hover:bg-muted/30
                    "
                  >
                    {/* Position */}
                    <div
                      className="
                        flex size-9 shrink-0 items-center justify-center
                        rounded-lg bg-muted/70 text-xs font-semibold
                        tabular-nums text-muted-foreground
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Variant information */}
                    <div className="min-w-0 flex-1 py-0.5">
                      <p className="truncate text-sm font-medium leading-5 text-foreground">
                        {variant.variantName}
                      </p>

                      <p className="mt-1 truncate text-xs leading-4 text-muted-foreground">
                        {variant.description}
                      </p>
                    </div>

                    {/* Position controls */}
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="
                          size-9 rounded-lg text-muted-foreground
                          transition-colors
                          hover:bg-muted hover:text-foreground
                          disabled:opacity-25
                        "
                        disabled={isFirst || isSaving}
                        aria-label={`Przesuń ${variant.variantName} wyżej`}
                        onClick={() => moveVariant(index, -1)}
                      >
                        <ArrowUp className="size-[17px]" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="
                          size-9 rounded-lg text-muted-foreground
                          transition-colors
                          hover:bg-muted hover:text-foreground
                          disabled:opacity-25
                        "
                        disabled={isLast || isSaving}
                        aria-label={`Przesuń ${variant.variantName} niżej`}
                        onClick={() => moveVariant(index, 1)}
                      >
                        <ArrowDown className="size-[17px]" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="
                  flex flex-col items-center justify-center
                  rounded-xl border border-dashed border-border
                  px-6 py-10 text-center
                "
              >
                <ListOrdered className="mb-3 size-8 text-muted-foreground/50" />

                <p className="text-sm font-medium text-foreground">
                  Brak wariantów odpowiedzi
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Dodaj warianty, aby móc zarządzać ich kolejnością.
                </p>
              </div>
            )}
          </div>

          {/* Information */}
          <div
            className="
              flex items-start gap-2.5 rounded-xl
              bg-muted/50 px-4 py-3
            "
          >
            <ListOrdered
              className="
                mt-0.5 size-4 shrink-0 text-muted-foreground
              "
            />

            <p className="text-xs leading-5 text-muted-foreground">
              Kolejność wariantów określa ich pozycję na liście. Możesz
              swobodnie przesuwać każdy wariant za pomocą przycisków ze
              strzałkami.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex justify-end gap-3 border-t border-border/60
            bg-muted/20 px-7 py-5 sm:px-8
          "
        >
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="rounded-xl"
            disabled={isSaving}
            onClick={handleCancel}
          >
            Anuluj
          </Button>

          <Button
            type="button"
            size="lg"
            className="min-w-[155px] rounded-xl px-6"
            disabled={!isDirty || isSaving}
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              "Zapisz kolejność"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
