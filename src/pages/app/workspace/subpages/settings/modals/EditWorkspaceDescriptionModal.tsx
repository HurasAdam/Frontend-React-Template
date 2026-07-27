import { FolderPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";

import { Button } from "../../../../../../components/ui/button";
import { Textarea } from "../../../../../../components/ui/textarea";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  workspace: {
    id: string;
    description: string;
  };
};

type FormData = {
  description: string;
};

export const EditWorkspaceDescriptionModal = ({
  isOpen,
  onClose,
  workspace,
}: Props) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      description: workspace.description ?? "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("UPDATE DESCRIPTION", {
      id: workspace.id,
      description: data.description,
    });

    toast.success("Opis kolekcji został zaktualizowany");

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="
          sm:max-w-[520px]
          overflow-hidden
          rounded-[28px]
          border-0
          bg-background
          p-0
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            border-b
            bg-muted/20
            px-8
            pt-8
            pb-7
          "
        >
          <DialogHeader>
            <div className="space-y-5">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  bg-background
                  px-3.5
                  py-1.5
                  text-[11px]
                  font-medium
                  tracking-[0.12em]
                  text-muted-foreground
                  shadow-sm
                "
              >
                <FolderPen className="size-3.5" />
                EDYCJA KOLEKCJI
              </div>

              <div className="space-y-2">
                <DialogTitle
                  className="
                    text-[26px]
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Zmień opis kolekcji
                </DialogTitle>

                <p
                  className="
                    max-w-md
                    text-[14px]
                    leading-6
                    text-muted-foreground
                  "
                >
                  Zaktualizuj opis kolekcji. Informacja pomoże użytkownikom
                  zrozumieć jej przeznaczenie.
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* CURRENT VALUE */}
          <div
            className="
              mt-7
              rounded-2xl
              border
              bg-background
              px-5
              py-4
              shadow-sm
            "
          >
            <div
              className="
                mb-1
                text-[11px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-muted-foreground
              "
            >
              Aktualny opis
            </div>

            <div
              className="
                text-[15px]
                font-semibold
                tracking-tight
                line-clamp-3
              "
            >
              {workspace.description || "Brak opisu"}
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7 space-y-6">
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">Nowy opis</label>

            <Textarea
              {...register("description")}
              placeholder="Np. Kolekcja zawierająca artykuły dotyczące obsługi klientów..."
              className="
                min-h-32
                resize-none
              "
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Anuluj
            </Button>

            <Button type="submit">Zapisz zmiany</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
