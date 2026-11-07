import { useQueryClient } from "@tanstack/react-query";
import { useChangePasswordMutation } from "../use-auth";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isChangePasswordPending } =
    useChangePasswordMutation();

  const changePassword = async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await mutateAsync(payload);

    await queryClient.invalidateQueries({
      queryKey: ["article"],
    });
  };

  return {
    changePassword,
    isChangePasswordPending,
  };
};
