import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";

import { useCreateRoleMutation } from "../../../hooks/roles/mutations/use-roles.mutations";
import type { CreateUserPayload } from "../validation/create-user.schema";
import { AddUserForm } from "./AddUserForm";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  roles: {
    _id: string;
    name: string;
    iconKey?: string;
    labelColor?: string;
  }[];
  closeOnOutsideClick?: boolean;
}

export const AddUserModal = ({
  isOpen,
  onClose,
  roles,
  closeOnOutsideClick,
}: AddUserModalProps) => {
  const { mutate } = useCreateRoleMutation();

  const onSubmit = (data: CreateUserPayload) => {
    mutate(data);
    console.log(data);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="
          max-h-[85vh] overflow-y-auto
          rounded-2xl
          bg-background/80 backdrop-blur-xl
          shadow-2xl
          p-0
      w-full
  sm:max-w-[640px]
      lg:max-w-xl
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <PlusIcon className="w-6 h-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Nowy użytkownik
              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">
                Utwórz konto i przypisz rolę w systemie
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 pb-6">
          <AddUserForm roles={roles} onSubmit={onSubmit} isSubmitting={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
