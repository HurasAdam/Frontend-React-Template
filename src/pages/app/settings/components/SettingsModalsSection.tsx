import type { AxiosError } from "axios";
import { toast } from "sonner";

import { useChangePassword } from "../../../../hooks/auth/actions/change-password";

import type { SettingsModalType } from "../hooks/useSettingsModal";
import { ChangePasswordModal } from "../modals/ChangePasswordModal";

interface Props {
  type: SettingsModalType;
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModalsSection({
  type,
  isOpen,
  onClose,
}: Props) {
  const { changePassword, isChangePasswordPending } = useChangePassword();

  const onChangePassword = async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword(payload);

      onClose();
      toast.success("Twoje hasło zostało zmienione.");
      return;
    } catch (error) {
      const { status } = error as AxiosError;

      if (status === 401) {
        toast.error("Nie udało się zmienić hasła", {
          description: "Aktualne hasło jest niepoprawne.",
        });
        return;
      }

      toast.error("Wystąpił błąd podczas zmiany hasła.");
      return;
    }
  };

  if (!type) return null;

  switch (type) {
    case "CHANGE_PASSWORD":
      return (
        <ChangePasswordModal
          isOpen={isOpen}
          onClose={onClose}
          isPending={isChangePasswordPending}
          onSubmit={onChangePassword}
        />
      );

    default:
      return null;
  }
}
