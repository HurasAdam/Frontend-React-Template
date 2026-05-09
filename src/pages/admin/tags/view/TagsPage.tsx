import {
  Eye,
  Hash,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { ITag } from "../../../../features/tags/hooks/useTagModal";
import { useFindTagsQuery } from "../../../../hooks/tags/use-tags";

interface Props {
  openAdd: () => void;
  openInfo: (tag: ITag) => void;
}

export const TagsPage = ({ openAdd, openInfo }: Props) => {
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
            className="group rounded-2xl border bg-card p-4 hover:bg-accent/40 transition"
          >
            <div className="flex items-center justify-between">
              {/* LEFT - klik w cały blok */}
              <button
                onClick={() => openInfo(tag)}
                className="flex items-center gap-3 text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                  <Hash size={14} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{tag.name}</span>
                  <span className="text-xs text-muted-foreground">
                    tag systemowy
                  </span>
                </div>
              </button>

              {/* RIGHT - dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-muted">
                    <MoreVertical size={16} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="text-xs border-b pb-2  text-muted-foreground">
                    Dostępne opcje :
                  </DropdownMenuLabel>

                  <DropdownMenuGroup className="space-y-0.5">
                    <DropdownMenuItem
                      onClick={() => openInfo(tag)}
                      className="flex items-center gap-3 py-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 opacity-70" />
                      <span>Szczegóły</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 py-2 cursor-pointer">
                      <Pencil className="w-4 h-4 opacity-70" />
                      <span>Edytuj</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 py-2 text-red-500 cursor-pointer">
                      <Trash2 className="w-4 h-4 opacity-70" />
                      <span>Usuń</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
