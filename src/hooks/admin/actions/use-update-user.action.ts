import queryClient from "../../../config/query.config";
import type { EditUserPayload } from "../../../pages/admin/user/validation/edit-user.schema";
import { useUpdateUserMutation } from "../mutations/use-admin.mutations";

interface UpdateUserProps {
  id: string;
  payload: EditUserPayload;
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUpdateUserAction = () => {
  const { mutate, isPending } = useUpdateUserMutation();

  const updateUser = ({ id, payload, onSuccess, onError }: UpdateUserProps) => {
    mutate(
      { id, payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["user-with-details", id],
          });

          onSuccess?.();
        },
        onError: () => {
          onError?.();
        },
      },
    );
  };

  return {
    updateUser,
    isPending,
  };
};
