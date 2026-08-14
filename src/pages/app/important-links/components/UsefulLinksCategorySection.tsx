import { ExternalLink, Info, Link as LinkIcon, Star } from "lucide-react";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import type { ILink } from "../../../../services/usefullLinks/usefullLink.types";
import { EmptyState } from "../../../shared/common/EmptyState";

interface Props {
  links: ILink[];
  hasLinks: boolean;
  openLinkInfo: (link: ILink) => void;
  openAddLink: () => void;
}

export const UsefulLinksCategorySection = ({
  links,
  hasLinks,
  openLinkInfo,
  openAddLink,
}: Props) => {
  if (!hasLinks) {
    return (
      <EmptyState
        icon={LinkIcon}
        title="Nie dodano jeszcze żadnych linków"
        description="Dodaj skróty do zasobów i treści, z których często korzystasz"
        actionLabel="Dodaj link"
        onAction={openAddLink}
      />
    );
  }

  if (links.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <LinkIcon className="h-7 w-7 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium">
            Brak linków spełniających kryteria
          </p>

          <p className="max-w-sm text-center text-xs text-muted-foreground">
            Spróbuj zmienić wyszukiwaną frazę lub wybrać inną kategorię.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} openLinkInfo={openLinkInfo} />
      ))}
    </div>
  );
};

interface LinkCardProps {
  link: ILink;
  openLinkInfo: (link: ILink) => void;
}

const LinkCard = ({ link, openLinkInfo }: LinkCardProps) => {
  const handleOpenLink = () => {
    window.open(normalizeUrl(link.url), "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={handleOpenLink}
      className="group relative cursor-pointer transition-all hover:border-primary/30 hover:shadow-md"
    >
      {link.isFeatured && (
        <Star
          className="absolute right-3 top-3 h-3.5 w-3.5 fill-primary/45 text-primary/60"
          aria-label="Wyróżniony link"
        />
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          {/* Link icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <LinkIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            {/* Title */}
            <div className="flex items-start justify-between gap-2 pr-5">
              <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {link.name}
              </h3>

              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Description */}
            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
              {link.description || "Brak opisu"}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
              <Badge variant="outline" className="text-[10px]">
                {link.category.name}
              </Badge>

              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation();
                  openLinkInfo(link);
                }}
                className="h-auto gap-1 p-0 text-xs text-muted-foreground hover:text-primary"
              >
                Szczegóły
                <Info className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const normalizeUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
};
