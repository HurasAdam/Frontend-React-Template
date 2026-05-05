import { Layers, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useFindProductsQuery } from "../../../../hooks/products/use-products";
import type { IProduct } from "../../../../services/product/product.types";

type Props = {
  openAdd: () => void;
};

export const ProductsPage = ({ openAdd }: Props) => {
  const [search, setSearch] = useState("");

  const { data = [] } = useFindProductsQuery({ name: search });

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Produkty</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj produktami
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
        {data.map((product: IProduct) => (
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
                  style={{ backgroundColor: product.labelColor }}
                />

                <p className="text-sm font-semibold">{product.name}</p>
              </div>

              {/* COUNT */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Layers size={14} />
                99+
              </div>
            </div>

            {/* BADGE */}
            <div className="mt-4">
              <span
                className="text-xs px-2 py-1 rounded-md"
                style={{
                  backgroundColor: `${product.labelColor}20`,
                  color: product.labelColor,
                }}
              >
                {product.name}
              </span>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            Brak produktów
          </div>
        )}
      </div>
    </div>
  );
};
