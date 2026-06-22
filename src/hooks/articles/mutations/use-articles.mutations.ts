import { useMutation } from "@tanstack/react-query";
import { articleServie } from "../../../services/articles/article.service";

export const useCreateArticleMutation = () => {
  return useMutation({
    mutationFn: (payload) => articleServie.create(payload),
  });
};
