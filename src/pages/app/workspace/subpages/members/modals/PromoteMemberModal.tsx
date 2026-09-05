import { Crown, Loader2, ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { IWorkspaceMemberInfo } from "../hooks/useMemberModal";

type Props = {
  isOpen: boolean;
  member: IWorkspaceMemberInfo | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (memberId: string) => void;
};

export function PromoteMemberModal({
  isOpen,
  member,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  if (!member) {
    return null;
  }

  const handleConfirm = async () => {
    await onConfirm(member.memberId);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isPending) {
          onClose();
        }
      }}
    >
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[520px]">
        {/* Header */}
        <div className="border-b border-border/60 bg-linear-to-br from-amber-500/10 via-transparent to-transparent px-8 pt-8 pb-7">
          <DialogHeader className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm">
                <Crown className="size-5" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur">
                <UserRound className="size-3" />
                WŁAŚCICIEL
              </span>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-[26px] leading-tight font-semibold tracking-[-0.03em]">
                Zmień właściciela kolekcji
              </DialogTitle>

              <DialogDescription className="text-[14px] leading-6">
                Przekaż właścicielstwo kolekcji wybranej osobie.
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <div className="px-8 py-7">
          {/* Selected member */}
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-sm font-semibold shadow-sm">
                {member.name.charAt(0)}
                {member.surname.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {member.name} {member.surname}
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {member.email}
                </p>
              </div>

              <Crown className="size-4 shrink-0 text-amber-500" />
            </div>
          </div>

          {/* Warning */}
          <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-amber-500" />

              <div>
                <p className="text-sm font-medium text-foreground">
                  Transfer właścicielstwa
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Po potwierdzeniu <strong>{member.name}</strong> zostanie
                  właścicielem kolekcji. Obecny właściciel utraci ten status.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border/60 bg-muted/30 px-8 py-5">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="rounded-xl"
            disabled={isPending}
            onClick={onClose}
          >
            Anuluj
          </Button>

          <Button
            type="button"
            size="lg"
            className="rounded-xl bg-amber-500 px-6 text-white hover:bg-amber-600"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Przekazywanie...
              </>
            ) : (
              <>
                <Crown className="size-4" />
                Ustaw jako właściciela
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
