import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../config/query.config";

interface Props {
  children: React.ReactNode;
}

export const TanstackQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
