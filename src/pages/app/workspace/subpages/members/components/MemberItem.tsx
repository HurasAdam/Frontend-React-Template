import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Crown, MoreVertical, Settings2, Trash2 } from "lucide-react";
import type { WorkspaceMember } from "./MembersSection";

interface WorkspaceMemberCardProps {
  member: WorkspaceMember;
  onRequestRemove: (member: WorkspaceMember) => void;
  onRequestPromote: (member: WorkspaceMember) => void;
  onRequestEdit: (member: WorkspaceMember) => void;
}

export const WorkspaceMemberCard = ({
  member,
  onRequestRemove,
  onRequestPromote,
  onRequestEdit,
}: WorkspaceMemberCardProps) => {
  return (
    <div className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/30">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-10 shrink-0 border border-border/60">
          <AvatarFallback className="bg-muted text-sm font-medium">
            {member.name?.[0]}
            {member.surname?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {member.name} {member.surname}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {member.email}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={
            member.isOwner
              ? "rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary"
              : "rounded-full border border-border/60 bg-muted/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground"
          }
        >
          {member.isOwner ? "WŁAŚCICIEL" : "CZŁONEK"}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-xl text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            >
              <MoreVertical className="size-4" />
              <span className="sr-only">Opcje członka</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 rounded-2xl border-border/60 bg-popover/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            <div className="px-3 py-2.5">
              <p className="text-xs font-semibold text-foreground">
                Zarządzanie członkiem
              </p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {member.name} {member.surname}
              </p>
            </div>

            <div className="my-1 h-px bg-border/60" />

            <DropdownMenuItem
              onClick={() => onRequestEdit(member)}
              className="cursor-pointer rounded-xl px-2.5 py-2.5"
            >
              <div className="mr-2.5 flex size-8 items-center justify-center rounded-lg bg-muted">
                <Settings2 className="size-4 text-muted-foreground" />
              </div>

              <div>
                <p className="text-sm font-medium">Uprawnienia</p>
                <p className="text-[11px] text-muted-foreground">
                  Zarządzaj dostępem
                </p>
              </div>
            </DropdownMenuItem>

            {!member.isOwner && (
              <>
                <DropdownMenuItem
                  onClick={() => onRequestPromote(member)}
                  className="cursor-pointer rounded-xl px-2.5 py-2.5"
                >
                  <div className="mr-2.5 flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Crown className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Ustaw jako właściciela
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Przekaż własność kolekcji
                    </p>
                  </div>
                </DropdownMenuItem>

                <div className="my-1 h-px bg-border/60" />

                <DropdownMenuItem
                  onClick={() => onRequestRemove(member)}
                  className="cursor-pointer rounded-xl px-2.5 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <div className="mr-2.5 flex size-8 items-center justify-center rounded-lg bg-destructive/10">
                    <Trash2 className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Usuń z kolekcji</p>
                    <p className="text-[11px] text-destructive/70">
                      Odbierz dostęp
                    </p>
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
