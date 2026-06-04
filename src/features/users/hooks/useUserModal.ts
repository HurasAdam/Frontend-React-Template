import { useState } from "react";

interface ISelectedUser {
  id: string;
  name: string;
  email: string;
}

type UserModalState = {
  mode: "PASSWORD_RESET";
  user: ISelectedUser;
} | null;

export const useUserModal = () => {
  const [state, setState] = useState<UserModalState>(null);

  const openPasswordReset = (user: ISelectedUser) => {
    setState({
      mode: "PASSWORD_RESET",
      user,
    });
  };

  const close = () => setState(null);

  return {
    state,
    isOpen: state !== null,
    user: state?.user ?? null,
    openPasswordReset,
    close,
  };
};
