import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Eye,
  LinkIcon,
  MoreVertical,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useFindUsefullLinksWithCategoryQuery } from "../../../../hooks/usefullLinks/queries/usefullLinks.queries";

interface Props {
  openAddLink: () => void;
  openAddCategory: () => void;
  openLinkInfo: () => void;
}

const LinkRow = ({ link, openLinkInfo }: any) => {
  console.log("LINK::", link);
  return (
    <div className="group flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        {/* STAR (only indicator) */}
        <div className="flex w-5 justify-center">
          {link.isFeatured ? (
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          ) : (
            <div className="h-4 w-4 opacity-0" />
          )}
        </div>

        {/* TEXT */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{link.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {link.url}
          </div>
        </div>
      </a>

      {/* ACTIONS */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
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
                onClick={() => openLinkInfo(link)}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 opacity-70" />
                <span>Szczegóły</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >
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
  );
};

export const ImportantLinksPage = ({
  openAddLink,
  openLinkInfo,
  openAddCategory,
}: Props) => {
  const { data = [] } = useFindUsefullLinksWithCategoryQuery();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter(
      (link) =>
        link.name.toLowerCase().includes(search.toLowerCase()) ||
        link.url.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const categories = useMemo(() => {
    const unique = filtered.map((l) => l.category).filter(Boolean);

    return unique
      .filter((cat, i, self) => self.findIndex((c) => c.id === cat.id) === i)
      .sort((a, b) => a.order - b.order);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <LinkIcon size={20} className="text-muted-foreground" />
            Przydatne linki
          </h1>

          <Button onClick={openAddLink} className="rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>

        {/* SEARCH */}
        <div className="mb-8 max-w-md">
          <Input
            placeholder="Szukaj linku..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={openAddLink}
              className="text-muted-foreground"
            >
              <Plus className="h-4 w-4 mr-1" />
              Link
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={openAddCategory}
              className="text-muted-foreground"
            >
              <Plus className="h-4 w-4 mr-1" />
              Kategoria
            </Button>
          </div>
        </div>

        {/* CATEGORIES ONLY */}
        <div className="space-y-10">
          {categories.map((category) => {
            const links = filtered.filter(
              (link) => link.category?.id === category.id,
            );

            return (
              <section key={category.id}>
                <h2 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </h2>

                <div className="overflow-hidden  rounded-xl border bg-card">
                  {links.map((link, index) => (
                    <div key={link.id}>
                      <LinkRow link={link} openLinkInfo={openLinkInfo} />

                      {index !== links.length - 1 && (
                        <div className="mx-5 h-px bg-border/80" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              Brak wyników
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
