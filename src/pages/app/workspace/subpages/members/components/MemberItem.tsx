import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Crown, MoreVertical, Settings2, Trash2 } from "lucide-react";
import type { WorkspaceMember } from "./MembersSection";

interface WorkspaceMemberCardProps {
  member: WorkspaceMember;
  workspaceId: string;
  permissions: Record<string, boolean>;
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
  const initials = `${member.name?.[0] ?? ""}${member.surname?.[0] ?? ""}`;

  return (
    <div className="group flex min-h-[76px] items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30">
      {/* Member */}
      <div className="flex min-w-0 items-center gap-3.5">
        <Avatar className="size-10 shrink-0 border border-border/70">
          <AvatarFallback className="bg-muted text-xs font-semibold tracking-tight text-foreground">
            {initials.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold tracking-[-0.01em]">
              {member.name} {member.surname}
            </p>

            {member.isOwner && (
              <Crown
                className="size-3.5 shrink-0 text-muted-foreground"
                aria-label="Właściciel"
              />
            )}
          </div>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {member.email}
          </p>
        </div>
      </div>

      {/* Role + actions */}
      <div className="flex shrink-0 items-center gap-3">
        <span
          className={
            member.isOwner
              ? "hidden rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-foreground sm:inline-flex"
              : "hidden rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground sm:inline-flex"
          }
        >
          {member.isOwner ? "WŁAŚCICIEL" : "CZŁONEK"}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-xl text-muted-foreground opacity-70 transition-colors hover:bg-muted hover:text-foreground group-hover:opacity-100"
              aria-label={`Opcje dla ${member.name} ${member.surname}`}
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-60 rounded-2xl border-border/70 bg-popover p-1.5 shadow-xl"
          >
            <div className="px-3 py-2.5">
              <p className="text-xs font-semibold">Zarządzanie członkiem</p>

              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {member.name} {member.surname}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-border/60" />

            <DropdownMenuItem
              onClick={() => onRequestEdit(member)}
              className="cursor-pointer rounded-xl px-2.5 py-2.5"
            >
              <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
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
                  <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Crown className="size-4 text-muted-foreground" />
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

                <DropdownMenuSeparator className="my-1 bg-border/60" />

                <DropdownMenuItem
                  onClick={() => onRequestRemove(member)}
                  className="cursor-pointer rounded-xl px-2.5 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <div className="mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
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
