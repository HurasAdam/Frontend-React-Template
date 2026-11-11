import { FolderPlus, Plus } from "lucide-react";

import { Button } from "../../../../components/ui/button";

interface UsefulLinksHeaderProps {
  openAddLink: () => void;
  openAddCategory: () => void;
}

export const UsefulLinksHeader = ({
  openAddLink,
  openAddCategory,
}: UsefulLinksHeaderProps) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Przydatne linki
        </h1>

        <p className="max-w-xl text-sm text-muted-foreground">
          Linki i materiały przydatne w codziennej pracy Helpdesku.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openAddCategory}
          className="gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Nowa kategoria</span>
          <span className="sm:hidden">Kategoria</span>
        </Button>

        <Button type="button" size="sm" onClick={openAddLink} className="gap-2">
          <Plus className="h-4 w-4" />
          Dodaj link
        </Button>
      </div>
    </div>
  );
};
