import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/ui/button";

interface WorkspaceAccessDeniedProps {
  message?: string;
}

export const WorkspaceAccessDenied = ({
  message = "Nie masz dostępu do tej kolekcji.",
}: WorkspaceAccessDeniedProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          bg-card
          p-10
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
            bg-destructive/10
            text-destructive
          "
        >
          <AlertTriangle size={38} />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Brak dostępu</h1>

          <p className="text-sm leading-6 text-muted-foreground">{message}</p>

          <p className="text-xs leading-5 text-muted-foreground">
            Sprawdź, czy używasz poprawnego linku lub skontaktuj się z
            właścicielem kolekcji, aby uzyskać dostęp.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/workspaces")}
          >
            <ArrowLeft size={16} />
            Wróć do kolekcji
          </Button>
        </div>
      </div>
    </div>
  );
};
