import { useMutation } from "@tanstack/react-query";
import { roleService } from "../../../services/role/role.service";

export const useCreateRoleMutation = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return roleService.create(data);
    },
  });
};
