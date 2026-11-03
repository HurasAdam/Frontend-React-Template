import { Check, Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

interface ResponseVariant {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
  note: string;
}

interface Props {
  variant: ResponseVariant;
  onEdit: (variant: ResponseVariant) => void;
  onDelete: (variant: ResponseVariant) => void;
}

export function VariantCard({ variant, onEdit, onDelete }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyVariant = async () => {
    setCopiedId(variant.id);

    try {
      await navigator.clipboard.writeText(variant.variantContent);
    } catch {
      const textArea = document.createElement("textarea");

      textArea.value = variant.variantContent;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    window.setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <article className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="
              grid
              size-7
              shrink-0
              place-items-center
              rounded-md
              bg-foreground
              font-mono
              text-[10px]
              font-semibold
              text-background
            "
          >
            {variant.order + 1}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold">{variant.variantName}</h3>

            {/* <p className="mt-1 text-xs text-muted-foreground">{variant.note}</p> */}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={copyVariant}
            aria-label={`Kopiuj: ${variant.variantName}`}
          >
            {copiedId === variant.id ? (
              <Check className="text-chart-2" />
            ) : (
              <Copy />
            )}

            <span className="hidden sm:inline">
              {copiedId === variant.id ? "Skopiowano" : "Kopiuj"}
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label={`Więcej opcji: ${variant.variantName}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="w-52 rounded-2xl border-border/70 bg-popover p-1.5 shadow-xl"
            >
              <div className="px-3 py-2.5">
                <p className="text-xs font-semibold text-foreground">
                  Zarządzanie wariantem
                </p>

                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Dostępne akcje
                </p>
              </div>

              <DropdownMenuSeparator className="bg-border/60" />

              <DropdownMenuItem
                onClick={() => onEdit(variant)}
                className="cursor-pointer rounded-xl px-2.5 py-2.5"
              >
                <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Pencil className="size-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">Edytuj</p>

                  <p className="text-[11px] text-muted-foreground">
                    Zmień treść wariantu
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-border/60" />

              <DropdownMenuSeparator className="my-1 bg-border/60" />

              <DropdownMenuItem
                onClick={() => onDelete(variant)}
                className="cursor-pointer rounded-xl px-2.5 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <Trash2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">Usuń</p>

                  <p className="text-[11px] text-destructive/70">
                    Usuń ten wariant
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className="
          mt-5
          max-w-4xl
          whitespace-pre-line
          text-sm
          leading-7
          text-foreground/90
          sm:ml-10
        "
      >
        {variant.variantContent}
      </div>
    </article>
  );
}
