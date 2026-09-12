import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { FilePlus, Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../../../components/ui/button";
import { useAddWorkspaceArticle } from "../../../../../../hooks/workspace-articles/actions/add";
import {
  addWorkspaceArticleSchema,
  type AddWorkspaceArticleFormData,
} from "../../../../../../validation/workspace-article/add";
import PageHeader from "../../settings/components/PageHeader";
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
      label: undefined,
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

    try {
      await addWorkspaceArticle({ workspaceId: id, payload });
      toast.success("Dodano nowy artykuł");
      navigate(`/workspace/${id}/folders/${payload.folderId}`);
      return;
    } catch (error) {
      const { status } = error as AxiosError;
      if (status === 403) {
        toast.error("Brak uprawnień", {
          description:
            "Nie masz uprawnień do dodawania artykułów w tej kolekcji",
        });
        return;
      }

      if (status === 409) {
        toast.error("Nie można dodać artykułu", {
          description:
            "W tym folderze znajduje się już artykuł o takim tytule - Tytuł musi być unikalny w obrębie folderu.",
        });
        return;
      }

      toast.error("Wystiapił błąd");
    }
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex w-full  flex-col">
          {/* <CreateArticleHeader /> */}
          <PageHeader
            title="Nowy artykuł"
            description="Wprowadź dane potrzebne do utworzenia artykułu"
            icon={FilePlus}
          />
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
              max-w-8xl
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
