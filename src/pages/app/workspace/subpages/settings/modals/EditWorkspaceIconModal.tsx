import { Check, FolderPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";

import { Button } from "../../../../../../components/ui/button";
import { workspaceIconOptions } from "../../../../../../constants/workspace-icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  workspace: {
    id: string;
    iconKey: string;
  };
};

type FormData = {
  iconKey: string;
};

export const EditWorkspaceIconModal = ({
  isOpen,
  onClose,
  workspace,
}: Props) => {
  const { handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      iconKey: workspace.iconKey,
    },
  });

  const selectedIcon = watch("iconKey");

  const onSubmit = (data: FormData) => {
    console.log("UPDATE ICON", {
      id: workspace.id,
      iconKey: data.iconKey,
    });

    toast.success("Ikona kolekcji została zaktualizowana");

    onClose();
  };

  const CurrentIcon = workspaceIconOptions.find(
    (item) => item.name === workspace.iconKey,
  )?.icon;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="
          sm:max-w-130
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
                  Zmień ikonę kolekcji
                </DialogTitle>

                <p
                  className="
                    max-w-md
                    text-[14px]
                    leading-6
                    text-muted-foreground
                  "
                >
                  Wybierz ikonę, która będzie reprezentować kolekcję w systemie.
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* CURRENT ICON */}
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
                mb-2
                text-[11px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-muted-foreground
              "
            >
              Aktualna ikona
            </div>

            <div className="flex items-center gap-3">
              {CurrentIcon ? (
                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    border
                    bg-muted/30
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CurrentIcon size={22} />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Brak ikony
                </span>
              )}
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7 space-y-6">
          <div className="space-y-3 flex flex-col">
            <label className="text-sm font-medium">Wybierz nową ikonę</label>

            <div className="grid grid-cols-8 gap-3">
              {workspaceIconOptions.map(({ name, icon: Icon }) => {
                const active = selectedIcon === name;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setValue("iconKey", name)}
                    className={`
                      w-10
                      h-10
                      rounded-md
                      border
                      flex
                      items-center
                      justify-center
                      transition
                      ${
                        active
                          ? "bg-primary/10 border-primary text-primary scale-105"
                          : "hover:bg-muted"
                      }
                    `}
                  >
                    <Icon size={19} />

                    {active && (
                      <Check
                        size={11}
                        className="
                          absolute
                          translate-x-3
                          -translate-y-3
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              size="lg"
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Anuluj
            </Button>

            <Button size="lg" type="submit">
              Zatwierdź
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
