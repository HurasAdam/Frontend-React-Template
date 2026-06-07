import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { useResetUserPasswordAction } from "../../../../hooks/admin/actions/use-reset-user-password.action";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export const ResetPasswordModal = ({ isOpen, onClose, user }: Props) => {
  const { resetPassword, isPending } = useResetUserPasswordAction();

  const [done, setDone] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const handleReset = () => {
    if (!user) return;

    resetPassword({
      userId: user.id,
      onSuccess: (temporaryPassword) => {
        setPassword(temporaryPassword);
        setVisible(false);
        setDone(true);

        toast.success("Hasło zostało zresetowane");
      },
      onError: () => {
        toast.error("Nie udało się zresetować hasła");
      },
    });
  };

  const handleClose = () => {
    setDone(false);
    setPassword(null);
    setVisible(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl border-0 bg-background text-foreground shadow-2xl p-0">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <KeyRound className="size-4 text-muted-foreground" />
              </div>

              <div>
                <DialogTitle className="text-base font-medium tracking-tight">
                  Reset hasła
                </DialogTitle>

                {user && (
                  <p className="text-xs text-muted-foreground">
                    {user.name} • {user.email}
                  </p>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="px-6 pb-6 space-y-4">
          {!done ? (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                System wygeneruje nowe hasło jednorazowe. Zostanie ono
                automatycznie skopiowane do schowka.
              </p>

              <button
                onClick={handleReset}
                disabled={isPending}
                className="w-full rounded-xl bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                {isPending ? "Generowanie..." : "Resetuj hasło"}
              </button>
            </>
          ) : (
            <>
              {/* SUCCESS */}
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CheckCircle2 className="size-6 text-green-500" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Wygenerowano nowe hasło
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Hasło dostępne tylko w tym oknie
                  </p>
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="rounded-xl bg-muted border border-border p-3 text-center font-mono text-sm tracking-widest text-foreground">
                {visible && password ? password : "••••••••••"}
              </div>

              {/* ACTIONS */}
              <div className="space-y-2">
                <button
                  onClick={() => setVisible((v) => !v)}
                  className="w-full rounded-xl bg-muted text-foreground py-2.5 text-sm hover:bg-muted/80 transition"
                >
                  {visible ? "Ukryj hasło" : "Pokaż hasło"}
                </button>

                <button
                  onClick={() => {
                    if (!password) return;
                    navigator.clipboard.writeText(password);
                    toast.success("Hasło zostało skopiowane do schowka", {
                      position: "bottom-right",
                    });
                  }}
                  className="w-full rounded-xl bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition"
                >
                  Skopiuj ponownie
                </button>

                <button
                  onClick={handleClose}
                  className="w-full rounded-xl bg-muted text-foreground py-2.5 text-sm hover:bg-muted/80 transition"
                >
                  Zamknij
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
