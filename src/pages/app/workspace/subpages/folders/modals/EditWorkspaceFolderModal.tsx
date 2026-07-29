import { FolderPen } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";

import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";

type FormData = {
  name: string;
  description: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;

  folder: {
    id: string;
    name: string;
    description: string;
  };

  onSave: (data: FormData) => Promise<unknown>;
};

export const EditWorkspaceFolderModal = ({
  isOpen,
  onClose,
  folder,
  onSave,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: folder.name,
      description: folder.description,
    },
  });

  useEffect(() => {
    reset({
      name: folder.name,
      description: folder.description,
    });
  }, [folder, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await onSave(data);

      toast.success("Folder został zaktualizowany", {
        position: "top-right",
      });

      onClose();
    } catch {
      toast.error("Nie udało się zapisać zmian", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset({
            name: folder.name,
            description: folder.description,
          });

          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-xl overflow-hidden rounded-[28px] border-0 bg-background p-0 shadow-2xl">
        <div className="border-b bg-muted/20 px-8 pt-8 pb-7">
          <DialogHeader>
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground shadow-sm">
                <FolderPen className="size-3.5" />
                EDYCJA FOLDERU
              </div>

              <div className="space-y-2">
                <DialogTitle className="text-[26px] font-semibold tracking-[-0.03em]">
                  Edytuj folder
                </DialogTitle>

                <p className="max-w-md text-[14px] leading-6 text-muted-foreground">
                  Zmień nazwę oraz opis folderu. Zmiany zostaną zapisane po
                  zatwierdzeniu formularza.
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 py-7">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Nazwa folderu</label>

            <Input
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Opis</label>

            <Textarea rows={5} {...register("description")} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
            >
              Anuluj
            </Button>

            <Button type="submit" size="lg">
              Zapisz zmiany
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
