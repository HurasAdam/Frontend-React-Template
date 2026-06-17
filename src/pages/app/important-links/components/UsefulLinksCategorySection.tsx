import { Eye, MoreVertical, Pencil, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type {
  ILink,
  ILinkCategory,
} from "../../../../services/usefullLinks/usefullLink.types";

interface Props {
  category: ILinkCategory;

  links: ILink[];

  openLinkInfo: (link: ILink) => void;
}

export const UsefulLinksCategorySection = ({
  links,
  category,
  openLinkInfo,
}: Props) => {
  return (
    <section>
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
};

const LinkRow = ({
  link,
  openLinkInfo,
}: {
  link: ILink;
  openLinkInfo: (link: ILink) => void;
}) => {
  return (
    <div className="group flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center gap-4"
      >
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
