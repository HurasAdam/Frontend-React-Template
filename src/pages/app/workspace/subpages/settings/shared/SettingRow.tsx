import { Pencil } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";

interface Props {
  title: string;
  description: string;
  value: React.ReactNode;
  onEdit: () => void;
}

export function SettingRow({ title, description, value, onEdit }: Props) {
  return (
    <div
      className="
    px-6
    py-5
  "
    >
      <div>
        <p className="text-sm font-medium">{title}</p>

        <p
          className="
        text-xs
        text-muted-foreground
        mt-1
      "
        >
          {description}
        </p>
      </div>

      <div
        className="
      mt-4
      flex
      items-center
      justify-between
      gap-5
    "
      >
        <div
          className="
        text-sm
        max-w-[650px]
        break-words
      "
        >
          {value}
        </div>

        <Button size="sm" variant="outline" onClick={onEdit}>
          <Pencil size={14} />
          Edytuj
        </Button>
      </div>
    </div>
  );
}
