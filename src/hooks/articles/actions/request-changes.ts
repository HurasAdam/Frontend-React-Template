import { useQueryClient } from "@tanstack/react-query";
import { useRequestArticleChangesMutation } from "../mutations/use-articles.mutations";

export const useRequestArticleChanges = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isRequestChangesPending } =
    useRequestArticleChangesMutation();

  const requestArticleChanges = async (
    articleId: string,
    payload: { reviewNote: string },
  ) => {
    await mutateAsync({ articleId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    requestArticleChanges,
    isRequestChangesPending,
  };
};
