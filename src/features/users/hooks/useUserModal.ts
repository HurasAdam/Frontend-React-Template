import { useState } from "react";

interface ISelectedUser {
  id: string;
  name: string;
  email: string;
}

type UserModalState =
  | { mode: "PASSWORD_RESET"; user: ISelectedUser }
  | { mode: "EDIT_ROLE"; user: ISelectedUser }
  | null;

export const useUserModal = () => {
  const [state, setState] = useState<UserModalState>(null);

  const openPasswordReset = (user: ISelectedUser) => {
    setState({ mode: "PASSWORD_RESET", user });
  };

  const openEditRole = (user: ISelectedUser) => {
    setState({ mode: "EDIT_ROLE", user });
  };

  const close = () => setState(null);

  const isOpen = state !== null;

  const isPasswordResetOpen = state?.mode === "PASSWORD_RESET";
  const isRoleEditOpen = state?.mode === "EDIT_ROLE";

  const user = state?.user ?? null;

  return {
    state,

    // actions
    openPasswordReset,
    openEditRole,
    close,

    isOpen,
    isPasswordResetOpen,
    isRoleEditOpen,

    user,
  };
};
