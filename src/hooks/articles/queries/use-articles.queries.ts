import { useQuery } from "@tanstack/react-query";
import { articleServie } from "../../../services/articles/article.service";

export const useFindArticlesQuery = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => articleServie.find(),
  });
};
