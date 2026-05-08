import {
  ArrowLeft,
  Calendar,
  Layers,
  MessageSquare,
  Palette,
  Tag,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useFindOneProductQuery } from "../../../../hooks/products/use-products";

type Category = {
  id: string;
  name: string;
};

type ConversationTopic = {
  id: string;
  name: string;
};

type ProductDetails = {
  id: string;
  name: string;
  labelColor: string;
  createdAt: string;
  categories: Category[];
  topics: ConversationTopic[];
};

const MOCK_PRODUCT: ProductDetails = {
  id: "1",
  name: "Produkt Premium",
  labelColor: "#6366F1",
  createdAt: "2026-05-01",
  categories: [
    { id: "1", name: "Elektronika" },
    { id: "2", name: "Dom" },
    { id: "3", name: "Nowość" },
  ],
  topics: [
    { id: "1", name: "Reklamacje" },
    { id: "2", name: "Sprzedaż" },
    { id: "3", name: "Wsparcie" },
  ],
};

type Props = {
  onBack: () => void;
};

export const ProductPage = ({ onBack }: Props) => {
  const { id } = useParams();
  const { data: productData } = useFindOneProductQuery(id);

  const product = MOCK_PRODUCT;

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border hover:bg-muted"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Szczegóły produktu
            </p>
          </div>
        </div>

        {/* PRODUCT BADGE (ONLY COLOR USAGE) */}
        <div
          className="px-3 py-1 rounded-lg text-xs font-medium"
          style={{
            backgroundColor: `${product.labelColor}20`,
            color: product.labelColor,
          }}
        >
          {product.name}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* BASIC INFO */}
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4">
              Informacje podstawowe
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Layers size={16} className="text-muted-foreground" />
                <span className="text-sm">{product.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Palette size={16} style={{ color: product.labelColor }} />
                <span className="text-sm" style={{ color: product.labelColor }}>
                  kolor produktu
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Kategorie</h2>

              <button
                className="text-xs px-3 py-1 rounded-lg border hover:bg-muted"
                style={{
                  borderColor: `${product.labelColor}40`,
                }}
              >
                Dodaj kategorię
              </button>
            </div>

            <div className="space-y-2">
              {product.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl border hover:bg-muted/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <Tag size={14} style={{ color: product.labelColor }} />
                    <span className="text-sm">{cat.name}</span>
                  </div>

                  <div
                    className="opacity-0 group-hover:opacity-100 transition text-xs"
                    style={{ color: product.labelColor }}
                  >
                    Edytuj
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOPICS */}
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Tematy rozmów</h2>

              <button
                className="text-xs px-3 py-1 rounded-lg border hover:bg-muted"
                style={{
                  borderColor: `${product.labelColor}40`,
                }}
              >
                Dodaj temat
              </button>
            </div>

            <div className="space-y-2">
              {product.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl border hover:bg-muted/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare
                      size={14}
                      style={{ color: product.labelColor }}
                    />
                    <span className="text-sm">{topic.name}</span>
                  </div>

                  <div
                    className="opacity-0 group-hover:opacity-100 transition text-xs"
                    style={{ color: product.labelColor }}
                  >
                    Edytuj
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* STATS */}
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-semibold mb-4">Statystyki</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Artykuły</span>
                <span className="font-medium">124</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Kategorie</span>
                <span className="font-medium">{product.categories.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tematy</span>
                <span className="font-medium">{product.topics.length}</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="rounded-2xl border bg-card p-5 space-y-3">
            <button
              className="w-full px-4 py-2 rounded-xl text-sm text-white hover:opacity-90"
              style={{ backgroundColor: product.labelColor }}
            >
              Edytuj produkt
            </button>

            <button className="w-full px-4 py-2 rounded-xl border text-sm hover:bg-muted">
              Usuń produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
