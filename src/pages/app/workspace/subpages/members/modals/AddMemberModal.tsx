/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  Check,
  CheckCheck,
  Loader2,
  Search,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input";
import { useAddWorkspaceMembers } from "../../../../../../hooks/workspace-members/actions/add";
import { useFindAvailableUsersByWorkspaceQuery } from "../../../../../../hooks/workspace-members/queries/use-workspace-members.queries";
import { cn } from "../../../../../../lib/utils";

export interface IWorkspaceUser {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface Props {
  workspaceId: string;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
}

export function AddMemberModal({
  workspaceId,
  isOpen,
  isPending,
  onClose,
}: Props) {
  const { data, isLoading } =
    useFindAvailableUsersByWorkspaceQuery(workspaceId);

  const { addWorkspaceMembers } = useAddWorkspaceMembers();

  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const users: IWorkspaceUser[] = data ?? [];

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user.name} ${user.surname}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search, users]);

  const selectedCount = selectedUserIds.length;

  const allFilteredSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((user) => selectedUserIds.includes(user.id));

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedUserIds([]);
    }
  }, [isOpen]);

  const toggleUser = (userId: string) => {
    setSelectedUserIds((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  };

  const toggleAllFilteredUsers = () => {
    const filteredIds = filteredUsers.map((user) => user.id);

    setSelectedUserIds((current) => {
      if (allFilteredSelected) {
        return current.filter((id) => !filteredIds.includes(id));
      }

      return Array.from(new Set([...current, ...filteredIds]));
    });
  };

  const handleClose = () => {
    if (isPending) {
      return;
    }

    setSearch("");
    setSelectedUserIds([]);
    onClose();
  };

  const handleSave = async () => {
    if (!selectedUserIds.length || isPending) {
      return;
    }

    try {
      await addWorkspaceMembers(workspaceId, selectedUserIds);
      toast.success("Dodano nowych członków do kolekcji");
      onClose();
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Nie masz uprawnień do dodawania członków do tej kolekcji.",
        });
        onClose();
        return;
      }
      onClose();
      toast.error("Wystapił błąd");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="min-w-[960px] max-w-[960px] overflow-hidden rounded-[24px] border-border/60 p-0 shadow-2xl">
        <DialogHeader className="relative overflow-hidden border-b px-7 pb-6 pt-7">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <UserPlus className="size-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
                  Członkowie
                </span>

                {selectedCount > 0 ? (
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                    {selectedCount} zaznaczonych
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    Nie wybrano
                  </span>
                )}
              </div>

              <DialogTitle className="text-xl font-semibold tracking-tight">
                Dodaj członków
              </DialogTitle>

              <DialogDescription className="mt-1.5 max-w-[580px] text-sm leading-relaxed">
                Wybierz osoby, które chcesz dodać do tej kolekcji.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 px-7 py-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Szukaj po imieniu, nazwisku lub adresie e-mail..."
              className="h-11 rounded-xl border-border/70 bg-muted/20 pl-10 pr-10"
              disabled={isPending}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* List header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="size-4 text-muted-foreground" />

              <span>Dostępne osoby</span>

              <span className="text-xs text-muted-foreground">
                ({filteredUsers.length})
              </span>
            </div>

            {filteredUsers.length > 0 && !isLoading && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleAllFilteredUsers}
                disabled={isPending}
                className="h-8 gap-1.5 text-xs"
              >
                <CheckCheck className="size-3.5" />

                {allFilteredSelected
                  ? "Odznacz wszystkie"
                  : "Zaznacz wszystkie"}
              </Button>
            )}
          </div>

          {/* Users list */}
          <div className="h-[360px] overflow-y-auto rounded-2xl border border-border/80 bg-background p-1.5 scrollbar-custom">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Ładowanie osób...
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-muted">
                  <Users className="size-5 text-muted-foreground" />
                </div>

                <p className="text-sm font-medium">Nie znaleziono osób</p>

                <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-muted-foreground">
                  Spróbuj zmienić wyszukiwaną frazę.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);

                  const initials = `${user.name.charAt(0)}${user.surname.charAt(
                    0,
                  )}`.toUpperCase();

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => toggleUser(user.id)}
                      disabled={isPending}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors",
                        "hover:border-border/60 hover:bg-muted/60",
                        isSelected &&
                          "border-violet-500/20 bg-violet-500/[0.08] hover:bg-violet-500/[0.10]",
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold transition-colors",
                          isSelected
                            ? "bg-violet-500 text-white"
                            : "border border-border/60 bg-muted/80 text-muted-foreground",
                        )}
                      >
                        {initials}
                      </div>

                      {/* User info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {user.name} {user.surname}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>

                      {/* Selection */}
                      <div
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-md border transition-all",
                          isSelected
                            ? "border-violet-500 bg-violet-500 text-white"
                            : "border-border bg-background group-hover:border-muted-foreground/50",
                        )}
                      >
                        {isSelected && <Check className="size-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Default permissions info */}
          <div className="flex gap-3 rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] px-4 py-3.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
              <Users className="size-4 text-violet-600 dark:text-violet-400" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold">Domyślne uprawnienia</p>

              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                Nowi członkowie zostaną dodani bez uprawnień. Możesz nadać
                odpowiednie uprawnienia później w ustawieniach członka.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="px-7 pb-7 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isPending}
            className="h-10 rounded-xl px-4 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Anuluj
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={selectedCount === 0 || isPending}
            className="h-10 min-w-[170px] rounded-xl px-5 text-sm font-semibold shadow-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Dodawanie...
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                Dodaj osoby
                {selectedCount > 0 && (
                  <span className="ml-1 rounded-md bg-white/15 px-1.5 py-0.5 text-xs">
                    {selectedCount}
                  </span>
                )}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
