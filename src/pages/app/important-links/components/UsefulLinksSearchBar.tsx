import { Plus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onAddLink: () => void;
  onAddCategory: () => void;
}

export const UsefulLinksSearchBar = ({
  onAddLink,
  onAddCategory,
  value,
  onChange,
}: Props) => {
  return (
    <div className="mb-8 max-w-md">
      <Input
        placeholder="Wyszukaj link"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="mt-2 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddLink}
          className="text-muted-foreground"
        >
          <Plus className="h-4 w-4 mr-1" />
          Link
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onAddCategory}
          className="text-muted-foreground"
        >
          <Plus className="h-4 w-4 mr-1" />
          Kategoria
        </Button>
      </div>
    </div>
  );
};
