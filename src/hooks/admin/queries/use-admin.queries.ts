import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../../services/admin";

export const useFindUserWithDetailsQuery = (id?: string) => {
  return useQuery({
    queryKey: ["user-with-details", id],
    queryFn: () => adminService.users.findOneWithDetails(id as string),
    enabled: !!id,
  });
};
