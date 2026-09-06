import { FilePenLine, Loader2, ShieldCheck, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "../../../../../../lib/utils";

export interface IWorkspaceMemberPermissions {
  addFolder: boolean;
  editFolder: boolean;
  deleteFolder: boolean;
  addArticle: boolean;
  editArticle: boolean;
  deleteArticle: boolean;
  addMember: boolean;
  removeMember: boolean;
  editWorkspace: boolean;
}

export interface IWorkspaceMember {
  memberId: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  isOwner: boolean;
  permissions: IWorkspaceMemberPermissions;
}

type Props = {
  isOpen: boolean;
  member: IWorkspaceMember | null;
  isPending: boolean;
  onClose: () => void;
  onSave: (memberId: string, permissions: IWorkspaceMemberPermissions) => void;
};

type PermissionGroup = {
  title: string;
  description: string;
  permissions: {
    name: keyof IWorkspaceMemberPermissions;
    label: string;
    description: string;
  }[];
};

const permissionGroups: PermissionGroup[] = [
  {
    title: "Foldery",
    description: "Zarządzanie folderami w workspace.",
    permissions: [
      {
        name: "addFolder",
        label: "Dodawanie folderów",
        description: "Może tworzyć nowe foldery.",
      },
      {
        name: "editFolder",
        label: "Edycja folderów",
        description: "Może zmieniać nazwę, opis i kolor folderów.",
      },
      {
        name: "deleteFolder",
        label: "Usuwanie folderów",
        description: "Może usuwać istniejące foldery.",
      },
    ],
  },
  {
    title: "Artykuły",
    description: "Zarządzanie artykułami i szablonami.",
    permissions: [
      {
        name: "addArticle",
        label: "Dodawanie artykułów",
        description: "Może tworzyć nowe artykuły.",
      },
      {
        name: "editArticle",
        label: "Edycja artykułów",
        description: "Może edytować istniejące artykuły.",
      },
      {
        name: "deleteArticle",
        label: "Usuwanie artykułów",
        description: "Może usuwać artykuły.",
      },
    ],
  },
  {
    title: "Dostęp i uprawnienia",
    description: "Zarządzanie członkami workspace.",
    permissions: [
      {
        name: "addMember",
        label: "Dodawanie członków",
        description: "Może zapraszać osoby do workspace.",
      },
      {
        name: "removeMember",
        label: "Usuwanie członków",
        description: "Może usuwać osoby z workspace.",
      },
    ],
  },
  {
    title: "Workspace",
    description: "Zarządzanie ustawieniami workspace.",
    permissions: [
      {
        name: "editWorkspace",
        label: "Edycja workspace",
        description: "Może zmieniać ustawienia workspace.",
      },
    ],
  },
];

export function EditMemberPermissionsModal({
  isOpen,
  member,
  isPending,
  onClose,
  onSave,
}: Props) {
  const { control, handleSubmit, reset } =
    useForm<IWorkspaceMemberPermissions>();

  useEffect(() => {
    if (member) {
      reset(member.permissions);
    }
  }, [member, reset]);

  const onSubmit = async (permissions: IWorkspaceMemberPermissions) => {
    if (!member) return;

    console.log("PERMITY TO:", permissions);
    await onSave(member.memberId, permissions);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="gap-0 overflow-hidden rounded-[24px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[780px]">
        {/* Header */}
        <div className="border-b border-border/60 bg-linear-to-br from-violet-500/10 to-transparent px-8 pt-8 pb-7">
          <DialogHeader className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
                <ShieldCheck className="size-5" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur">
                <UserRound className="size-3" />
                UPRAWNIENIA
              </span>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-[26px] leading-tight font-semibold tracking-[-0.03em]">
                {member
                  ? `${member.name} ${member.surname}`
                  : "Uprawnienia członka"}
              </DialogTitle>

              <DialogDescription className="text-[14px] leading-6">
                Zarządzaj dostępem do funkcji workspace dla wybranej osoby.
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        {member ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-[60vh] overflow-y-auto scrollbar-custom px-8 py-7">
              {/* Member info */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-sm font-semibold text-foreground shadow-sm">
                  {member.name.charAt(0)}
                  {member.surname.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">
                      {member.name} {member.surname}
                    </p>

                    {member.isOwner ? (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                        Właściciel
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Owner notice */}
              {member.isOwner ? (
                <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                  <p className="text-xs leading-5 text-muted-foreground">
                    Właściciel workspace posiada pełne uprawnienia. Uprawnień
                    właściciela nie można edytować.
                  </p>
                </div>
              ) : null}

              {/* Permissions */}
              <div className="space-y-5">
                {permissionGroups.map((group) => (
                  <section
                    key={group.title}
                    className="overflow-hidden rounded-2xl border border-border/60"
                  >
                    <div className="border-b border-border/60 bg-muted/20 px-4 py-3">
                      <h3 className="text-sm font-semibold text-foreground">
                        {group.title}
                      </h3>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {group.description}
                      </p>
                    </div>

                    <div className="space-y-2 p-2">
                      {group.permissions.map((permission) => (
                        <Controller
                          key={permission.name}
                          control={control}
                          name={permission.name}
                          render={({ field }) => {
                            const enabled = Boolean(field.value);

                            return (
                              <div
                                className={cn(
                                  "group flex items-center gap-4 rounded-xl border px-3.5 py-3 transition-all duration-200",
                                  enabled
                                    ? "border-primary/20 bg-primary/[0.045] shadow-[0_1px_2px_oklch(0.2_0.04_265/0.04)]"
                                    : "border-transparent bg-muted/20 hover:border-border/60 hover:bg-muted/40",
                                )}
                              >
                                <button
                                  type="button"
                                  disabled={member.isOwner || isPending}
                                  onClick={() => field.onChange(!enabled)}
                                  className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none"
                                >
                                  <div
                                    className={cn(
                                      "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                                      enabled
                                        ? "bg-primary/10 text-primary"
                                        : "bg-muted text-muted-foreground",
                                    )}
                                  >
                                    {enabled ? (
                                      <ShieldCheck className="size-4" />
                                    ) : (
                                      <ShieldCheck className="size-4 opacity-50" />
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-[13px] font-medium text-foreground">
                                        {permission.label}
                                      </p>
                                    </div>

                                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  </div>
                                </button>

                                <Switch
                                  checked={enabled}
                                  onCheckedChange={field.onChange}
                                  disabled={member.isOwner || isPending}
                                  aria-label={permission.label}
                                  className="shrink-0"
                                />
                              </div>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t border-border/60 bg-muted/30 px-8 py-5">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="rounded-xl"
                onClick={onClose}
              >
                Anuluj
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={member.isOwner || isPending}
                className="rounded-xl px-6"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <FilePenLine className="size-4" />
                    Zapisz uprawnienia
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
