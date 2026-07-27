import { Lock, Plus, Users } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";

interface Props {
  workspaceId?: string;
  permissions: Record<string, boolean>;
}

export const MembersHeader = ({ workspaceId, permissions }: Props) => {
  console.log(permissions);
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Użytkownicy dodani do kolekcji
        </h1>
      </div>

      <Button
        className={
          !permissions?.addMember ? "opacity-50 cursor-not-allowed" : ""
        }
        title={
          !permissions?.addMember
            ? "Brak uprawnień do dodania użytkowników"
            : ""
        }
      >
        {!permissions?.addMember ? (
          <>
            <Lock className="w-4 h-4 text-primary-foreground pointer-events-none" />{" "}
            Dodaj użytkownika
          </>
        ) : (
          <>
            <Plus /> Dodaj użytkownika
          </>
        )}
      </Button>
    </header>
  );
};
