import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BadgePlus, ExternalLink, LinkIcon, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type ImportantLink = {
  id: string;
  name: string;
  url: string;
  category: string;
  isFeatured?: boolean;
};

const MOCK_LINKS: ImportantLink[] = [
  {
    id: "1",
    name: "Pomoc",
    url: "https://example.com",
    category: "Wyróżnione",
  },
  {
    id: "2",
    name: "Panel administracyjny",
    url: "https://example.com",
    category: "Dokumentacja",
  },
  {
    id: "3",
    name: "Figma",
    url: "https://example.com",
    category: "Pozostałe",
  },
  {
    id: "4",
    name: "Statystyki",
    url: "https://example.com",
    category: "Pozostałe",
  },
  {
    id: "5",
    name: "Procedura",
    url: "https://example.com",
    category: "Dokumentacja",
  },
];

interface Props {
  openAddCategory: () => void;
}

export const ImportantLinksPage = ({ openAddCategory }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MOCK_LINKS.filter(
      (link) =>
        link.name.toLowerCase().includes(search.toLowerCase()) ||
        link.url.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const categories = Array.from(new Set(filtered.map((link) => link.category)));

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl flex items-center gap-2 font-semibold">
            <LinkIcon size={24} className="text-muted-foreground" aria-hidden />
            <span>Przydatne linki</span>
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                <Plus className="h-4 w-4" />
                Dodaj
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <LinkIcon className="h-4 w-4" />
                Dodaj link
              </DropdownMenuItem>

              <DropdownMenuItem onClick={openAddCategory} className="gap-2">
                <BadgePlus className="h-4 w-4" />
                Dodaj kategorię
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Szukaj linku..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div>
          {categories.map((category) => {
            const links = filtered.filter((link) => link.category === category);

            return (
              <section key={category} className="mb-12">
                <h2 className="text-sm font-medium text-muted-foreground mb-4 mx-3">
                  {category}
                </h2>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                  {links.map((link, index) => (
                    <div key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-6 py-5 hover:bg-muted/40 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {link.name}
                          </p>

                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {link.url}
                          </p>
                        </div>

                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
                      </a>

                      {index !== links.length - 1 && (
                        <div className="h-px bg-border mx-6" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              Brak wyników dla podanej frazy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
