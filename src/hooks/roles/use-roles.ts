import { useMutation, useQuery } from "@tanstack/react-query";
import { roleService } from "../../services/role/role.service";

export const useCreateRoleMutation = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return roleService.create(data);
    },
  });
};

export const useGetPermissionsQuery = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => {
      return roleService.getPermissions();
    },
  });
};

export const useFindRolesQuery = (filters) => {
  return useQuery({
    queryKey: ["roles", filters],
    queryFn: () => {
      return roleService.find(filters);
    },
  });
};
