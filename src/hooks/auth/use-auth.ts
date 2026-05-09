import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../../services/auth/auth.service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return authService.login(data);
    },
  });
};

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: authService.verifyMe,
    staleTime: 0,
    retry: false,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => {
      return authService.logout();
    },
  });
};
