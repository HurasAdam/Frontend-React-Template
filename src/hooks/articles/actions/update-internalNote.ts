import { useQueryClient } from "@tanstack/react-query";
import { useUpdateArticleInternalNoteMutation } from "../mutations/use-articles.mutations";

export const useUpdateArticleInternalNote = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isArticleInternalNoteUpdatePending } =
    useUpdateArticleInternalNoteMutation();

  const updateArticleInternalNote = async (
    articleId: string,
    payload: { title: string },
  ) => {
    await mutateAsync({ articleId, payload });

    await queryClient.invalidateQueries({
      queryKey: ["article", articleId],
    });
  };

  return {
    updateArticleInternalNote,
    isArticleInternalNoteUpdatePending,
  };
};
