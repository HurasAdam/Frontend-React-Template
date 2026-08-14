import { FolderPlus, LinkIcon, Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

interface UsefulLinksHeaderProps {
  openAddLink: () => void;
  openAddCategory: () => void;
}

export const UsefulLinksHeader = ({
  openAddLink,
  openAddCategory,
}: UsefulLinksHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Przydatne linki</h1>

        <p className="text-sm text-muted-foreground">
          Zewnętrzne zasoby, dokumentacje i narzędzia pomocnicze
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Dodaj
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={openAddLink}>
            <LinkIcon className="mr-2 h-4 w-4" />
            Dodaj link
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openAddCategory}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Dodaj kategorię
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
