import { Button } from "@/components/ui/button";
import { Check, CircleHelp } from "lucide-react";

type Props = {
  onVerify: () => void;
};

export function EditedArticleBanner({ onVerify }: Props) {
  return (
    <section className="mt-5 rounded-lg border border-blue-500/25 bg-blue-500/[0.04] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
            <CircleHelp className="size-5 text-blue-700 dark:text-blue-400" />
          </div>

          <div className="min-w-0 pt-0.5">
            <h2 className="text-sm font-semibold tracking-tight">
              Wymaga weryfikacji
            </h2>

            <p className="mt-1 max-w-2xl text-[13px] leading-5 text-muted-foreground">
              Treść artykułu została zmieniona i wymaga ponownej weryfikacji
              merytorycznej.
            </p>
          </div>
        </div>

        <Button type="button" onClick={onVerify} className="shrink-0">
          <Check />
          Zweryfikuj zmiany
        </Button>
      </div>
    </section>
  );
}
