import { useMutation } from "@tanstack/react-query";
import { adminService } from "../../services/admin";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return adminService.users.create(data);
    },
  });
};
