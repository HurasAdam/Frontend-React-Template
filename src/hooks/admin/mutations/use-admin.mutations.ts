import { useMutation } from "@tanstack/react-query";
import { adminService } from "../../../services/admin";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return adminService.users.create(data);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (id: string) => adminService.users.resetPassword(id),
  });
};

export const useChangeUserRoleMutation = () => {
  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      adminService.users.changeUserRole(id, roleId),
  });
};
