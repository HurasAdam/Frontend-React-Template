import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user/user.service";

export const useFindUsersWithDetailsQuery = () => {
  return useQuery({
    queryKey: ["users-with-details"],
    queryFn: () => userService.findWithDetails(),
  });
};
