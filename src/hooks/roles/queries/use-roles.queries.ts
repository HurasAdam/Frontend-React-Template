import { useQuery } from "@tanstack/react-query";
import { roleService } from "../../../services/role/role.service";

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
