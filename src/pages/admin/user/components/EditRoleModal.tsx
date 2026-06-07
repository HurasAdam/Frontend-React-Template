import { Check, Shield as FallbackIcon, UserCog2 } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { roleIconMap } from "../../../../constants/role-icons";
import { useChangeUserRoleAction } from "../../../../hooks/admin/actions/use-change-user-role.action";
import { useFindRolesQuery } from "../../../../hooks/roles/queries/use-roles.queries";

interface Props {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    surname: string;
    role: {
      id: string;
      name: string;
      labelColor: string;
      iconKey: string;
    } | null;
  } | null;
}

export const EditRoleModal = ({
  isOpen,
  closeOnOutsideClick,
  onClose,
  user,
}: Props) => {
  const { data: roles = [] } = useFindRolesQuery({});

  const { changeRole } = useChangeUserRoleAction();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(user?.role?.id ?? null);
    }
  }, [isOpen, user]);

  const handleClose = () => {
    setSelectedRole(user?.role?.id ?? null);
    setOpen(false);
    onClose();
  };

  const hasRoleChanged = selectedRole !== user?.role?.id;

  const onConfirm = () => {
    if (!user || !selectedRole || !hasRoleChanged) return;

    changeRole({
      userId: user.id,
      roleId: selectedRole,
      onSuccess: () => {
        toast.success("Zaktualizowano rolę");
        onClose();
      },
    });
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  const SelectedIcon =
    roleIconMap[selectedRoleData?.iconKey as keyof typeof roleIconMap] ??
    FallbackIcon;

  const CurrentRoleIcon =
    roleIconMap[user?.role?.iconKey as keyof typeof roleIconMap] ??
    FallbackIcon;

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="sm:max-w-[460px] rounded-2xl border-0 bg-background text-foreground shadow-2xl p-0 overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b border-border bg-muted/20">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <UserCog2 className="size-4 text-muted-foreground" />
              </div>

              <div>
                <DialogTitle className="text-base font-medium tracking-tight">
                  Zmiana roli użytkownika
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
        <div className="px-6 py-5 space-y-4">
          {/* CURRENT ROLE */}
          <div className="rounded-2xl bg-muted/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${user?.role?.labelColor ?? "#666"}22`,
                  color: user?.role?.labelColor ?? "#666",
                }}
              >
                <CurrentRoleIcon size={16} />
              </div>

              <div className="flex flex-col leading-tight">
                <p className="text-sm font-medium">
                  {user?.role?.name ?? "Brak roli"}
                </p>

                <p className="text-xs text-muted-foreground">Aktualna rola</p>
              </div>
            </div>
          </div>

          {/* ROLE SELECT */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Nowa rola
            </p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  className="
                    w-full flex items-center justify-between
                    rounded-xl border border-border bg-background
                    px-4 py-2.5 text-sm
                    hover:bg-muted/20 transition
                    outline-none focus:outline-none
                    focus:ring-0 focus-visible:ring-0
                  "
                >
                  <div className="flex items-center gap-3">
                    {selectedRoleData ? (
                      <>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: `${selectedRoleData.labelColor}22`,
                            color: selectedRoleData.labelColor,
                          }}
                        >
                          <SelectedIcon size={14} />
                        </div>

                        <span>{selectedRoleData.name}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        Wybierz rolę
                      </span>
                    )}
                  </div>

                  <span className="text-muted-foreground">▾</span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="p-0 w-[420px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Command>
                  <CommandInput placeholder="Szukaj roli..." />

                  <CommandEmpty>Brak wyników</CommandEmpty>

                  <CommandGroup>
                    {roles.map((role) => {
                      const active = selectedRole === role.id;

                      const Icon =
                        roleIconMap[role.iconKey as keyof typeof roleIconMap] ??
                        FallbackIcon;

                      return (
                        <CommandItem
                          key={role.id}
                          onSelect={() => {
                            setSelectedRole(role.id);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: `${role.labelColor}22`,
                                color: role.labelColor,
                              }}
                            >
                              <Icon size={14} />
                            </div>

                            <span>{role.name}</span>
                          </div>

                          {active && <Check className="size-4 text-primary" />}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl bg-muted text-foreground py-2.5 text-sm hover:bg-muted/80 transition"
            >
              Anuluj
            </button>

            <button
              onClick={onConfirm}
              disabled={!selectedRole || !hasRoleChanged}
              className="flex-1 rounded-xl bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
