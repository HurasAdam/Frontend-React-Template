import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../../../components/ui/button";
import { useAddWorkspaceArticle } from "../../../../../../hooks/workspace-articles/actions/add";
import {
  addWorkspaceArticleSchema,
  type AddWorkspaceArticleFormData,
} from "../../../../../../validation/workspace-article/add";
import CreateArticleHeader from "../components/PageHeader";
import { WorkspaceArticleForm } from "../forms/NewWorkspaceArticleForm";

type OutletContext = {
  workspace: unknown;
  folders: unknown[];
};

export const NewWorkspaceArticlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { folders } = useOutletContext<OutletContext>();

  const { addWorkspaceArticle, isAddPending } = useAddWorkspaceArticle();

  const form = useForm({
    resolver: zodResolver(addWorkspaceArticleSchema),
    defaultValues: {
      folderId: "",
      marker: undefined,
      title: "",
      responseVariant: {
        variantName: "Wersja 1",
        variantContent: "",
      },
    },
  });

  const onSubmit = async (payload: AddWorkspaceArticleFormData) => {
    console.log("123", payload);

    if (!id) {
      throw new Error("Workspace ID is missing");
    }

    await addWorkspaceArticle({ workspaceId: id, payload });
    toast.success("Dodano nowy artykuł");
    navigate(`/workspace/${id}/folders/${payload.folderId}`);
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex w-full  flex-col gap-10 ">
          <CreateArticleHeader />

          <WorkspaceArticleForm folders={folders} />
        </div>

        <footer
          className="
            sticky
            bottom-0
            border-t
            bg-background/80
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-5xl
              items-center
              justify-end
              gap-3
              px-6
              py-4
            "
          >
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isAddPending}
            >
              Anuluj
            </Button>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isAddPending}
              className="min-w-[160px]"
            >
              {isAddPending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                "Utwórz artykuł"
              )}
            </Button>
          </div>
        </footer>
      </div>
    </FormProvider>
  );
};
