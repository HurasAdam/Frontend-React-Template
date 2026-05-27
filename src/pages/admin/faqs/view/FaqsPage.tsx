import {
  CheckCircle2,
  Clock3,
  Plus,
  ScrollText,
  Search,
  ShieldCheck,
} from "lucide-react";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type IFaq = {
  id: string;
  title: string;
  description: string;
  labelColor: string;
  isDefault: boolean;
  iconKey: string;
  status: "draft" | "approved";
};

const mockedFaqs: IFaq[] = [
  {
    id: "1",
    title: "Zwroty i reklamacje",
    description: "Proces zwrotów produktów oraz obsługa reklamacji klientów.",
    labelColor: "#6366f1",
    isDefault: true,
    iconKey: "ScrollText",
    status: "approved",
  },

  {
    id: "2",
    title: "Płatności",
    description: "Dostępne metody płatności, faktury oraz statusy transakcji.",
    labelColor: "#10b981",
    isDefault: false,
    iconKey: "ShieldCheck",
    status: "approved",
  },

  {
    id: "3",
    title: "Dostawa",
    description: "Informacje dotyczące wysyłki oraz czasu realizacji zamówień.",
    labelColor: "#f59e0b",
    isDefault: false,
    iconKey: "Clock3",
    status: "draft",
  },
];

const iconMap = {
  ScrollText,
  ShieldCheck,
  Clock3,
};

type Props = {
  openAdd: () => void;
};

export const FaqsPage = ({ openAdd }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "draft"
  >("all");

  const filteredFaqs = useMemo(() => {
    return mockedFaqs.filter((faq) => {
      const matchesSearch = faq.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : faq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">FAQ</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Zarządzaj sekcjami FAQ i artykułami pomocy.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          Dodaj FAQ
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* SEARCH */}
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj FAQ..."
            className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              statusFilter === "all"
                ? "border bg-background font-medium"
                : "border border-transparent text-muted-foreground hover:border-border hover:bg-background"
            }`}
          >
            Wszystkie
          </button>

          <button
            onClick={() => setStatusFilter("approved")}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              statusFilter === "approved"
                ? "border bg-background font-medium"
                : "border border-transparent text-muted-foreground hover:border-border hover:bg-background"
            }`}
          >
            Opublikowane
          </button>

          <button
            onClick={() => setStatusFilter("draft")}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              statusFilter === "draft"
                ? "border bg-background font-medium"
                : "border border-transparent text-muted-foreground hover:border-border hover:bg-background"
            }`}
          >
            Robocze
          </button>
        </div>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredFaqs.map((faq) => {
          const Icon =
            iconMap[faq.iconKey as keyof typeof iconMap] || ScrollText;

          return (
            <Link key={faq.id} to={`/admin/faqs/${faq.id}`}>
              <div className="rounded-2xl border bg-card p-5 transition hover:border-primary/30 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${faq.labelColor}15`,
                        color: faq.labelColor,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">{faq.title}</h3>

                        {faq.isDefault && (
                          <span className="rounded-md border px-2 py-0.5 text-[11px] font-medium">
                            Domyślne
                          </span>
                        )}
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {faq.description}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="shrink-0">
                    {faq.status === "approved" ? (
                      <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                        <CheckCircle2 size={13} />
                        Opublikowane
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 rounded-md bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-500">
                        <Clock3 size={13} />
                        Robocze
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* EMPTY STATE*/}
      {filteredFaqs.length === 0 && (
        <div className="rounded-2xl border border-dashed py-14 text-center">
          <p className="text-sm text-muted-foreground">
            Nie znaleziono żadnych FAQ
          </p>
        </div>
      )}
    </div>
  );
};
