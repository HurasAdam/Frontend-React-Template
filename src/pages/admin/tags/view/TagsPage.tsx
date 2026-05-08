import { Hash, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { useFindTagsQuery } from "../../../../hooks/tags/use-tags";
import { formatDate } from "../../../../lib/utils";

type Tag = {
  id: string;
  name: string;
  createdBy: {
    name: string;
  };
  createdAt: string;
};

export const TagsPage = ({ openAdd }: { openAdd: () => void }) => {
  const [search, setSearch] = useState("");
  const { data: tags = [] } = useFindTagsQuery({ name: search });

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Hash size={20} />
            Tagi
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj tagami systemowymi
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Dodaj tag
        </button>
      </div>

      {/* SEARCH */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj tagu..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="group rounded-2xl border bg-card p-4 hover:shadow-md transition"
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              {/* TAG CHIP (visual identity) */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Hash size={14} />
                </div>

                <span className="text-sm font-semibold">{tag.name}</span>
              </div>

              {/* subtle hover indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition text-xs text-muted-foreground">
                tag
              </div>
            </div>

            {/* META */}
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User size={12} />
                {tag.createdBy.name}
              </div>

              <span>{formatDate(tag.createdAt)}</span>
            </div>
          </div>
        ))}

        {tags.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            Brak tagów
          </div>
        )}
      </div>
    </div>
  );
};
