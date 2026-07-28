import { Trash2 } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { Card } from "../shared/Card";
import { Section } from "../shared/Section";
import type { IWorkspaceInfo } from "../view/Settings";

interface Props {
  workspace: IWorkspaceInfo;
  onDelete: (workspace: IWorkspaceInfo) => void;
}

export default function DangerZone({ workspace, onDelete }: Props) {
  return (
    <Section title="Usuwanie kolekcji">
      <Card>
        <div className="px-6 py-5 flex items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Usuń kolekcję</p>

              <p className="text-xs text-muted-foreground max-w-xl">
                Trwale usuwa kolekcję oraz wszystkie powiązane dane. Tej
                operacji nie można cofnąć.
              </p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => onDelete(workspace)}
            className="shrink-0"
          >
            <Trash2 size={15} />
            Usuń kolekcję
          </Button>
        </div>
      </Card>
    </Section>
  );
}
