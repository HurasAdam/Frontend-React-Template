import { FolderPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";
import type { IFolderFormData } from "../../../../../../hooks/workspace-folders/mutations/types/workspace-folders.mutation.types";

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSave: (data: IFolderFormData) => Promise<unknown>;
};

export const AddWorkspaceFolderModal = ({
  isOpen,
  isPending,
  onClose,
  onSave,
}: Props) => {
  const { register, handleSubmit, reset } = useForm<IFolderFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: IFolderFormData) => {
    await onSave(data);
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-xl overflow-hidden rounded-[28px] border-0 bg-background p-0 shadow-2xl">
        <div className="border-b bg-muted/20 px-8 pt-8 pb-7">
          <DialogHeader>
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground shadow-sm">
                <FolderPlus className="size-3.5" />
                NOWY FOLDER
              </div>

              <div className="space-y-2">
                <DialogTitle className="text-[26px] font-semibold tracking-[-0.03em]">
                  📁 Dodaj folder
                </DialogTitle>

                <p className="max-w-md text-[14px] leading-6 text-muted-foreground">
                  Utwórz nowy folder, aby lepiej uporządkować artykuły w
                  kolekcji.
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 py-7">
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">Nazwa folderu</label>

            <Input
              {...register("name", {
                required: true,
              })}
              placeholder="np. Szablony pism"
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">Opis</label>

            <Textarea
              rows={5}
              {...register("description")}
              placeholder="Krótki opis zawartości folderu..."
            />
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

            <Button disabled={isPending} type="submit" size="lg">
              Dodaj folder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
