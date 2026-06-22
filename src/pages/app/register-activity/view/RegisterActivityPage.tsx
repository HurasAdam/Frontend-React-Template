import { MessageCircle, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useFindAllTopicsQuery } from "../../../../hooks/product-topics/queries/use-product-topic-queries";

type ActivityType = "CALL" | "MESSAGE";

interface Props {
  onCreateActivity: (data: {
    topicId: string;
    type: ActivityType;
    note?: string;
  }) => void;
}

export const RegisterActivityPage = ({ onCreateActivity }: Props) => {
  const { data: activityTopics = [] } = useFindAllTopicsQuery();

  const [noteMap, setNoteMap] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState("ALL");

  const setNote = (id: string, value: string) => {
    setNoteMap((prev) => ({ ...prev, [id]: value }));
  };

  const submit = (topicId: string, type: ActivityType) => {
    onCreateActivity({
      topicId,
      type,
      note: noteMap[topicId] || "",
    });

    setNoteMap((prev) => ({ ...prev, [topicId]: "" }));
  };

  const filteredTopics = useMemo(() => {
    return activityTopics.filter((topic) => {
      const matchesQuery = topic.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesProduct =
        productFilter === "ALL" ? true : topic.product?.name === productFilter;

      return matchesQuery && matchesProduct;
    });
  }, [activityTopics, query, productFilter]);

  const uniqueProducts = useMemo(() => {
    return Array.from(
      new Set(
        activityTopics.map((topic) => topic.product?.name).filter(Boolean),
      ),
    ) as string[];
  }, [activityTopics]);

  return (
    <div className="min-h-screen ">
      {/* HEADER */}
      <div className="sticky top-14 z-10 border-b bg-background/70 backdrop-blur-xl">
        <div className="mx-auto px-6 py-5 space-y-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Activity Center
            </h1>
            <p className="text-sm text-muted-foreground">
              Log calls, messages and operational notes in real time
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Search topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 pl-3"
              />
            </div>

            <select
              className="h-10 rounded-xl border bg-background px-3 text-sm shadow-sm"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="ALL">All products</option>
              {uniqueProducts.map((productName) => (
                <option key={productName} value={productName}>
                  {productName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="mx-auto  py-8 space-y-3">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="
              group flex items-center gap-6
              rounded-2xl border bg-card/60 backdrop-blur
              px-5 py-4
              transition
              hover:bg-card hover:shadow-md 
            "
          >
            {/* LEFT */}
            <div className="flex-1 min-w-[260px]">
              <p className="text-sm font-medium leading-snug">{topic.name}</p>

              {topic.product && (
                <div
                  className="mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium bg-muted/40"
                  style={{ color: topic.product.labelColor }}
                >
                  {topic.product.name}
                </div>
              )}
            </div>

            {/* NOTE */}
            <div className="flex-1">
              <Textarea
                placeholder="Notatka"
                value={noteMap[topic.id] || ""}
                onChange={(e) => setNote(topic.id, e.target.value)}
                className="
                  h-10 min-h-10 resize-none
                  rounded-xl border bg-background
                  text-sm
                  focus:ring-1 focus:ring-primary/30
                "
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 justify-end flex-1">
              <button
                onClick={() => submit(topic.id, "MESSAGE")}
                className="
      group relative
      h-11 w-11
      rounded-xl
      border bg-background
      shadow-sm
      hover:bg-muted/60 hover:shadow-md
      active:scale-95
      transition
      flex items-center justify-center
    "
                aria-label="Message"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
              </button>

              <button
                onClick={() => submit(topic.id, "CALL")}
                className="
      group relative
      h-11 w-11
      rounded-xl
      border bg-background
      shadow-sm
      hover:bg-muted/60 hover:shadow-md
      active:scale-95
      transition
      flex items-center justify-center
    "
                aria-label="Call"
              >
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
              </button>
            </div>
          </div>
        ))}

        {filteredTopics.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No topics match your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
