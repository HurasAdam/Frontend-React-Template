import { Button } from "@/components/ui/button";
import { CalendarClock, Check } from "lucide-react";

type Props = {
  onVerify: () => void;
};

export function PeriodicReverificationBanner({ onVerify }: Props) {
  return (
    <section className="mt-5 rounded-lg border border-blue-500/25 bg-blue-500/[0.04] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
            <CalendarClock className="size-5 text-blue-700 dark:text-blue-400" />
          </div>

          <div className="min-w-0 pt-0.5">
            <h2 className="text-sm font-semibold tracking-tight">
              Wymagana okresowa weryfikacja
            </h2>

            <p className="mt-1 max-w-2xl text-[13px] leading-5 text-muted-foreground">
              Od ostatniej weryfikacji minęło ponad 12 miesięcy. Sprawdź, czy
              informacje w artykule są nadal aktualne.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={onVerify}
          className="shrink-0 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        >
          <Check />
          Potwierdź aktualność
        </Button>
      </div>
    </section>
  );
}
