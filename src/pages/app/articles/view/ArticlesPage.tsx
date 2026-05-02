import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Article = {
  id: string;
  title: string;
  category: string;
  product: string;
  verifiedAt: Date;
};

const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Jak działa NFC w systemie zgłoszeń",
    category: "Technologia",
    product: "System Mieszkań",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 66),
  },
  {
    id: "2",
    title: "Nowy workflow zarządzania serwisem",
    category: "Procesy",
    product: "Panel Admina",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    id: "3",
    title: "Optymalizacja powiadomień push w aplikacji",
    category: "Technologia",
    product: "Mobile App",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "4",
    title: "Standardy bezpieczeństwa danych użytkownika",
    category: "Bezpieczeństwo",
    product: "System Mieszkań",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    id: "5",
    title: "Integracja płatności online krok po kroku",
    category: "Finanse",
    product: "Panel Admina",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "6",
    title: "Automatyczne zgłoszenia usterek z NFC tagów",
    category: "Technologia",
    product: "System Mieszkań",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18),
  },
  {
    id: "7",
    title: "Role i uprawnienia w systemie administracyjnym",
    category: "Procesy",
    product: "Panel Admina",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 220),
  },
  {
    id: "8",
    title: "UX checklist dla paneli SaaS",
    category: "Design",
    product: "Design System",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "9",
    title: "Jak projektować skalowalne API",
    category: "Technologia",
    product: "Backend Core",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
  },
  {
    id: "10",
    title:
      "Rodzic zgłasza, że nie widzi ocen dziecka w dzienniku elektronicznym",
    category: "Procesy",
    product: "System Mieszkań",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    id: "11",
    title: "Audyt logów użytkowników w systemie",
    category: "Bezpieczeństwo",
    product: "Backend Core",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 300),
  },
  {
    id: "12",
    title: "Strategie cache’owania danych w aplikacjach SaaS",
    category: "Technologia",
    product: "Backend Core",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

const CATEGORIES = ["Wszystkie", "Technologia", "Procesy", "Prawo"];
const PRODUCTS = ["Wszystkie", "System Mieszkań", "Panel Admina"];

export const ArticlesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Wszystkie");
  const [product, setProduct] = useState("Wszystkie");

  const filtered = useMemo(() => {
    return MOCK_ARTICLES.filter((a) => {
      const matchesSearch = a.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Wszystkie" || a.category === category;

      const matchesProduct = product === "Wszystkie" || a.product === product;

      return matchesSearch && matchesCategory && matchesProduct;
    });
  }, [search, category, product]);

  const resetFilters = () => {
    setSearch("");
    setCategory("Wszystkie");
    setProduct("Wszystkie");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className=" mx-auto ">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Baza szablonów</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Zarządzaj bazą wiedzy i publikacjami
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Plus size={16} />
            Nowy artykuł
          </button>
        </div>

        {/* FILTERS */}
        <div className="rounded-xl border bg-card p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* SEARCH */}
            <div className="relative md:col-span-2">
              <Search
                size={16}
                className="absolute left-3 top-3 text-muted-foreground"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Wyszukaj artykuł..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* PRODUCT */}
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-sm"
            >
              {PRODUCTS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* RESET */}
          <div className="flex justify-end mt-3">
            <button
              onClick={resetFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset filtrów
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="rounded-xl border bg-card overflow-hidden">
          {filtered.map((article, index) => (
            <div key={article.id}>
              <div className="flex items-center justify-between px-6 py-5">
                {/* LEFT */}
                <div>
                  <p className="text-sm font-medium">{article.title}</p>

                  <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.product}</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-xs text-muted-foreground text-right">
                  Zweryfikowany{" "}
                  {formatDistanceToNow(article.verifiedAt, {
                    addSuffix: true,
                    locale: pl,
                  })}
                </div>
              </div>

              {index !== filtered.length - 1 && (
                <div className="h-px bg-border mx-6" />
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">
              Brak wyników
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
