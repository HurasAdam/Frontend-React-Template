import { useState } from "react";

interface ISelectedUser {
  id: string;
  name: string;
  email: string;
  surname: string;
  role: {
    id: string;
    name: string;
    labelColor: string;
    iconKey: string;
  };
}

type UserModalState =
  | { mode: "PASSWORD_RESET"; user: ISelectedUser }
  | { mode: "EDIT_ROLE"; user: ISelectedUser }
  | { mode: "EDIT_USER"; user: ISelectedUser }
  | null;

export const useUserModal = () => {
  const [state, setState] = useState<UserModalState>(null);

  const openPasswordReset = (user: ISelectedUser) => {
    setState({ mode: "PASSWORD_RESET", user });
  };

  const openEditRole = (user: ISelectedUser) => {
    setState({ mode: "EDIT_ROLE", user });
  };

  const openEditUser = (user: ISelectedUser) => {
    setState({ mode: "EDIT_USER", user });
  };

  const close = () => setState(null);

  const isOpen = state !== null;

  const isPasswordResetOpen = state?.mode === "PASSWORD_RESET";
  const isRoleEditOpen = state?.mode === "EDIT_ROLE";
  const isUserEditOpen = state?.mode === "EDIT_USER";

  const user = state?.user ?? null;

  return {
    state,

    // actions
    openPasswordReset,
    openEditRole,
    openEditUser,
    close,

    isOpen,
    isPasswordResetOpen,
    isRoleEditOpen,
    isUserEditOpen,
    user,
  };
};
