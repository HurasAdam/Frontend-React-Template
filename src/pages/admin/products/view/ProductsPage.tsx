import { Layers, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useFindProductsQuery } from "../../../../hooks/products/use-products";

type Product = {
  id: string;
  name: string;
  color: string; // hex
  articlesCount: number;
};

// --- MOCK ---
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "System Mieszkań", color: "#6366f1", articlesCount: 34 },
  { id: "2", name: "Panel Admina", color: "#22c55e", articlesCount: 18 },
  { id: "3", name: "Backend Core", color: "#f97316", articlesCount: 52 },
  { id: "4", name: "Mobile App", color: "#0ea5e9", articlesCount: 12 },
  { id: "5", name: "Design System", color: "#a855f7", articlesCount: 27 },
  { id: "6", name: "Integracje", color: "#eab308", articlesCount: 9 },
  { id: "7", name: "API Publiczne", color: "#ef4444", articlesCount: 15 },
  { id: "8", name: "Automatyzacje", color: "#14b8a6", articlesCount: 6 },
  { id: "9", name: "AI Moduły", color: "#8b5cf6", articlesCount: 21 },
  { id: "10", name: "Monitoring", color: "#64748b", articlesCount: 11 },
];

type Props = {
  openAdd: () => void;
};

export const ProductsPage = ({ openAdd }: Props) => {
  const { data } = useFindProductsQuery();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Produkty</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj produktami i przypisanymi artykułami
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
          onClick={openAdd}
        >
          <Plus size={16} />
          Dodaj produkt
        </button>
      </div>

      {/* FILTER */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj produktu..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border bg-card p-5 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              {/* NAME */}
              <div className="flex items-center gap-3">
                {/* COLOR DOT */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: product.color }}
                />

                <p className="text-sm font-semibold">{product.name}</p>
              </div>

              {/* COUNT */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Layers size={14} />
                {product.articlesCount}
              </div>
            </div>

            {/* BADGE */}
            <div className="mt-4">
              <span
                className="text-xs px-2 py-1 rounded-md"
                style={{
                  backgroundColor: `${product.color}20`,
                  color: product.color,
                }}
              >
                {product.name}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            Brak produktów
          </div>
        )}
      </div>
    </div>
  );
};
