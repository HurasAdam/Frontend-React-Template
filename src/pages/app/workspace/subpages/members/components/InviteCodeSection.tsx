import { Copy, Eye, EyeOff, Link2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "../../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";
import { Input } from "../../../../../../components/ui/input";

interface WorkspaceInviteLinkSectionProps {
  inviteCode?: string;
}

const WorkspaceInviteLinkSection = ({
  inviteCode,
}: WorkspaceInviteLinkSectionProps) => {
  const [showCode, setShowCode] = useState(false);

  const onCopyInviteCode = (inviteCode: string) => {
    navigator.clipboard.writeText(inviteCode);

    toast.info("Kod zaproszenia skopiowany", {
      description: "Kod znajduje się teraz w schowku.",
      position: "bottom-right",
    });
  };

  if (!inviteCode) {
    return (
      <Card className="w-full overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-sm">
        <div className="border-b border-border/60 bg-muted/30 px-6 pt-6 pb-5">
          <CardHeader className="space-y-4 p-0">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted text-muted-foreground shadow-sm">
                <ShieldCheck className="size-4.5" />
              </div>

              <span className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
                DOSTĘP
              </span>
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg font-semibold tracking-[-0.02em]">
                Kod zaproszenia
              </CardTitle>

              <CardDescription className="text-[13px] leading-5">
                Kod zaproszenia jest dostępny tylko dla właściciela kolekcji.
              </CardDescription>
            </div>
          </CardHeader>
        </div>

        <CardContent className="px-6 py-5">
          <p className="text-xs leading-5 text-muted-foreground">
            Jeśli chcesz zaprosić nowe osoby do kolekcji, poproś jej właściciela
            o udostępnienie kodu.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-sm">
      <div className="border-b border-border/60 bg-muted/30 px-6 pt-6 pb-5">
        <CardHeader className="space-y-4 p-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted text-muted-foreground shadow-sm">
              <Link2 className="size-4.5" />
            </div>

            <span className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
              ZAPROSZENIA
            </span>
          </div>

          <div className="space-y-1.5">
            <CardTitle className="text-lg font-semibold tracking-[-0.02em]">
              Kod zaproszenia
            </CardTitle>

            <CardDescription className="text-[13px] leading-5">
              Udostępnij kod osobom, które chcesz zaprosić do kolekcji.
            </CardDescription>
          </div>
        </CardHeader>
      </div>

      <CardContent className="space-y-4 px-6 py-5">
        <div className="flex items-center gap-2">
          <Input
            type={showCode ? "text" : "password"}
            readOnly
            value={inviteCode}
            className="h-11 rounded-xl bg-muted/30 font-mono text-sm tracking-wider"
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 shrink-0 rounded-xl"
            onClick={() => setShowCode((value) => !value)}
            title={showCode ? "Ukryj kod" : "Pokaż kod"}
            aria-label={showCode ? "Ukryj kod" : "Pokaż kod"}
          >
            {showCode ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 shrink-0 rounded-xl"
            onClick={() => onCopyInviteCode(inviteCode)}
            title="Skopiuj kod"
            aria-label="Skopiuj kod"
          >
            <Copy className="size-4" />
          </Button>
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
          <p className="text-xs leading-5 text-muted-foreground">
            Każda osoba posiadająca ten kod może użyć go, aby dołączyć do
            kolekcji. Udostępniaj go tylko zaufanym osobom.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspaceInviteLinkSection;
