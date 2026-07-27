import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user/user.service";

export const useFindUsersWithDetailsQuery = () => {
  return useQuery({
    queryKey: ["users-with-details"],
    queryFn: () => userService.findWithDetails(),
  });
};

export const useFindUsersQuery = () => {
  return useQuery({
    queryKey: ["users-list"],
    queryFn: () => userService.find(),
  });
};

export const useFindWorkspaceCandidatesQuery = () => {
  return useQuery({
    queryKey: ["workspace-candidates"],
    queryFn: () => userService.findWorkspaceCandidates(),
  });
};
