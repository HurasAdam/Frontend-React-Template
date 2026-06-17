import { LinkIcon, Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface UsefulLinksHeaderProps {
  onAddLink: () => void;
}

export const UsefulLinksHeader = ({ onAddLink }: UsefulLinksHeaderProps) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="flex items-center gap-2 text-xl font-semibold">
        <LinkIcon size={20} className="text-muted-foreground" />
        Przydatne linki
      </h1>

      <Button onClick={onAddLink} className="rounded-xl">
        <Plus className="h-4 w-4 mr-2" />
        Dodaj
      </Button>
    </div>
  );
};
