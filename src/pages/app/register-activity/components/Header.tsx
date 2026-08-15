import { ClipboardList } from "lucide-react";

interface Props {
  filteredTopics: unknown[];
  hasActiveFilters: boolean;
}

export function Header({ filteredTopics, hasActiveFilters }: Props) {
  const count = filteredTopics.length;

  const label =
    count === 1 ? "temat" : count >= 2 && count <= 4 ? "tematy" : "tematów";

  return (
    <header className="mb-10 flex items-start justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <ClipboardList className="size-[18px]" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Rejestr zgłoszeń
          </h1>

          <p className="text-sm text-muted-foreground">
            Odnotuj temat poruszony podczas kontaktu z użytkownikiem.
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-2 text-sm text-muted-foreground">
        {hasActiveFilters ? (
          <>
            Znaleziono{" "}
            <span className="font-medium text-foreground">{count}</span> {label}
          </>
        ) : (
          <>
            <span className="font-medium text-foreground">{count}</span> {label}
          </>
        )}
      </div>
    </header>
  );
}
