import { useResetPasswordMutation } from "../mutations/use-admin.mutations";

export const useResetUserPasswordAction = () => {
  const { mutate, isPending } = useResetPasswordMutation();

  const resetPassword = ({
    userId,
    onSuccess,
    onError,
  }: {
    userId: string;
    onSuccess?: (temporaryPassword: string) => void;
    onError?: () => void;
  }) => {
    mutate(userId, {
      onSuccess: (res) => {
        navigator.clipboard.writeText(res.temporaryPassword);

        onSuccess?.(res.temporaryPassword);
      },
      onError: () => {
        onError?.();
      },
    });
  };

  return {
    resetPassword,
    isPending,
  };
};
