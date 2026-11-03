import { Button } from "@/components/ui/button";
import { Check, Clock3, MessageSquare } from "lucide-react";

interface Props {
  onApprove: () => void;
  onRequestChanges: () => void;
}

export function InitialApprovalBanner({ onApprove, onRequestChanges }: Props) {
  return (
    <section
      aria-labelledby="initial-approval-banner-title"
      className="mt-5 rounded-lg border border-amber-500/25 bg-amber-500/[0.04] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <Clock3 className="size-5 text-amber-700 dark:text-amber-400" />
          </div>

          <div className="min-w-0 pt-0.5">
            <h2
              id="initial-approval-banner-title"
              className="text-sm font-semibold tracking-tight"
            >
              Nowy artykuł wymaga zatwierdzenia
            </h2>

            <p className="mt-1 max-w-2xl text-[13px] leading-5 text-muted-foreground">
              Sprawdź treść artykułu i warianty odpowiedzi przed zatwierdzeniem
              i publikacją.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="border-border bg-background hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
            onClick={onRequestChanges}
          >
            <MessageSquare />
            Zgłoś uwagi
          </Button>

          <Button
            type="button"
            className="bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            onClick={onApprove}
          >
            <Check />
            Zatwierdź artykuł
          </Button>
        </div>
      </div>
    </section>
  );
}
