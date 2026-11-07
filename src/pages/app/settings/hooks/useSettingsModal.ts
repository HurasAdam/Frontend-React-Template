import { useState } from "react";

export type SettingsModalType =
  | "CHANGE_PASSWORD"
  | "CHANGE_AVATAR"
  | "CHANGE_EMAIL"
  | "DELETE_ACCOUNT"
  | null;

export const useSettingsModal = () => {
  const [type, setType] = useState<SettingsModalType>(null);

  const openChangePassword = () => setType("CHANGE_PASSWORD");
  const openChangeAvatar = () => setType("CHANGE_AVATAR");
  const openChangeEmail = () => setType("CHANGE_EMAIL");
  const openDeleteAccount = () => setType("DELETE_ACCOUNT");

  const close = () => setType(null);

  return {
    type,
    isOpen: type !== null,
    openChangePassword,
    openChangeAvatar,
    openChangeEmail,
    openDeleteAccount,
    close,
  };
};
