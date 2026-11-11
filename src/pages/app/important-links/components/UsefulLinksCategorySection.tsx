import {
  ExternalLink,
  Info,
  Link as LinkIcon,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "../../../../components/ui/button";

import type { ILink } from "../../types/link.types";

interface Props {
  links: ILink[];
  openLinkInfo: (link: ILink) => void;
  onEditLink: (link: ILink) => void;
  onDeleteLink: (link: ILink) => void;
}

const normalizeUrl = (url: string) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "#";

  return /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;
};

export const UsefulLinksCategorySection = ({
  links,
  openLinkInfo,
  onEditLink,
  onDeleteLink,
}: Props) => {
  if (links.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border/70 px-6 py-10 text-center">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-border/70 bg-card">
          <LinkIcon className="size-5 text-muted-foreground" />
        </div>

        <h3 className="text-sm font-semibold">Brak przydatnych linków</h3>

        <p className="mt-1.5 max-w-xs text-xs leading-5 text-muted-foreground">
          Nie znaleziono żadnych pozycji spełniających wybrane kryteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
      {/* Table header */}

      <div className="hidden grid-cols-[minmax(0,1fr)_180px_190px] items-center gap-4 border-b border-border/70 bg-muted/30 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground lg:grid">
        <span>Link</span>
        <span>Kategoria</span>
        <span className="text-right">Akcje</span>
      </div>

      {/* Links */}

      <div className="divide-y divide-border/70">
        {links.map((link) => (
          <div
            key={link.id}
            className="group grid grid-cols-1 items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/35 sm:px-5 lg:grid-cols-[minmax(0,1fr)_180px_190px] lg:gap-4"
          >
            {/* Link information */}

            <div className="flex min-w-0 items-start gap-3.5">
              <div
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                  link.isFeatured
                    ? "border-amber-500/15 bg-amber-500/[0.07]"
                    : "border-border/70 bg-muted/50 group-hover:border-primary/20 group-hover:bg-primary/[0.05]",
                )}
              >
                {link.isFeatured ? (
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                ) : (
                  <LinkIcon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <a
                  href={normalizeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex max-w-full items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <h3 className="truncate text-[13px] font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover/link:text-primary">
                    {link.name}
                  </h3>

                  <ExternalLink className="size-3 shrink-0 text-muted-foreground/0 transition-colors group-hover/link:text-muted-foreground" />
                </a>

                {link.description && (
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {link.description}
                  </p>
                )}

                <p className="mt-1 truncate text-[11px] text-muted-foreground/65">
                  {link.url}
                </p>

                {/* Featured marker */}

                {link.isFeatured && (
                  <div className="mt-2 lg:hidden">
                    <Badge
                      variant="outline"
                      className="h-[21px] gap-1 rounded-md border-amber-500/20 bg-amber-500/[0.07] px-1.5 text-[10px] font-medium text-amber-600 dark:text-amber-400"
                    >
                      <Star className="size-3 fill-current" />
                      Wyróżniony
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Category */}

            <div className="hidden min-w-0 items-center lg:flex">
              <span className="truncate text-[12px] font-medium text-muted-foreground">
                {link.category.name}
              </span>
            </div>

            {/* Actions */}

            <div className="flex items-center justify-between gap-2 lg:justify-end">
              {/* Mobile category */}

              <span className="max-w-[45%] truncate text-[11px] text-muted-foreground lg:hidden">
                {link.category.name}
              </span>

              <div className="ml-auto flex shrink-0 items-center gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 rounded-lg px-2.5 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                  aria-label={`Szczegóły linku: ${link.name}`}
                  onClick={() => openLinkInfo(link)}
                >
                  <Info className="size-3.5" />
                  <span>Szczegóły</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                      aria-label={`Więcej opcji dla linku: ${link.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="center"
                    sideOffset={8}
                    className="w-52 rounded-2xl border-border/70 bg-popover p-1.5 shadow-xl"
                  >
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-semibold text-foreground">
                        Zarządzanie linkiem
                      </p>

                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Dostępne akcje
                      </p>
                    </div>

                    <DropdownMenuSeparator className="bg-border/60" />

                    <DropdownMenuItem
                      onClick={() => onEditLink(link)}
                      className="cursor-pointer rounded-xl px-2.5 py-2.5"
                    >
                      <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Pencil className="size-4 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Edytuj
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Zmień dane linku
                        </p>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 bg-border/60" />

                    <DropdownMenuItem
                      onClick={() => onDeleteLink(link)}
                      className="cursor-pointer rounded-xl px-2.5 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <Trash2 className="size-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">Usuń</p>
                        <p className="text-[11px] text-destructive/70">
                          Usuń ten link
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
