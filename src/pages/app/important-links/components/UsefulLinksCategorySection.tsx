import { ExternalLink, Info, Link as LinkIcon, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../../../../components/ui/button";
import type { ILink } from "../../types/link.types";

interface Props {
  links: ILink[];
  openLinkInfo: (link: ILink) => void;
}

const normalizeUrl = (url: string) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "#";

  return /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;
};

export const UsefulLinksCategorySection = ({ links, openLinkInfo }: Props) => {
  if (links.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 px-6 py-10 text-center">
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
      <div className="divide-y divide-border/70">
        {links.map((link) => (
          <div
            key={link.id}
            className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/35"
          >
            {/* Icon */}
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
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

            {/* Link information */}
            <a
              href={normalizeUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center gap-3 outline-none"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[13px] font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
                  {link.name}
                </h3>

                {link.description && (
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {link.description}
                  </p>
                )}

                <p className="mt-1 truncate text-[11px] text-muted-foreground/70">
                  {link.url}
                </p>
              </div>

              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground" />
            </a>

            {/* Details */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 shrink-0 gap-2 px-3 text-xs text-muted-foreground hover:text-foreground"
              aria-label={`Szczegóły linku: ${link.name}`}
              onClick={() => openLinkInfo(link)}
            >
              <Info className="size-4" />
              <span>Szczegóły</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
