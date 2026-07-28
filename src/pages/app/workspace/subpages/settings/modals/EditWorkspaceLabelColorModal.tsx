import { Check, FolderPen, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";

import { Button } from "../../../../../../components/ui/button";

const colorOptions = [
  "#4F46E5",
  "#1D4ED8",
  "#06B6D4",
  "#10B981",
  "#16A34A",
  "#84CC16",
  "#F59E0B",
  "#F97316",
  "#EF4444",
  "#E11D48",
  "#A855F7",
  "#7C3AED",
  "#0F766E",
  "#8B5CF6",
  "#C2410C",
  "#9F1239",
];

type Props = {
  isOpen: boolean;
  onClose: () => void;

  workspace: {
    id: string;
    labelColor: string;
  };
  onSave: (data: { labelColor: string }) => void;
};

type FormData = {
  labelColor: string;
};

export const EditWorkspaceLabelColorModal = ({
  isOpen,
  onClose,
  workspace,
  onSave,
}: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      labelColor: workspace.labelColor,
    },
  });

  const selectedColor = watch("labelColor");

  const onSubmit = (data: FormData) => {
    onSave(data);
    toast.success("Kolor kolekcji został zaktualizowany");

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
                  Zmień kolor kolekcji
                </DialogTitle>

                <p
                  className="
                    max-w-md
                    text-[14px]
                    leading-6
                    text-muted-foreground
                  "
                >
                  Wybierz kolor identyfikujący kolekcję w systemie. Kolor będzie
                  widoczny dla wszystkich użytkowników.
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* CURRENT COLOR */}
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
              Aktualny kolor
            </div>

            <div className="flex items-center gap-3">
              <span
                className="
                  w-8
                  h-8
                  rounded-md
                  border
                "
                style={{
                  backgroundColor: workspace.labelColor,
                }}
              />

              <span className="text-sm font-semibold">
                {workspace.labelColor}
              </span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-7 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Wybierz nowy kolor</label>

            <div className="grid grid-cols-8 gap-3">
              {colorOptions.map((color) => {
                const active = selectedColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setValue("labelColor", color)}
                    className={`
                      w-9 h-9
                      rounded-md
                      border
                      flex
                      items-center
                      justify-center
                      transition
                      ${
                        active
                          ? "ring-2 ring-primary border-primary scale-110"
                          : "hover:scale-105"
                      }
                    `}
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    {active && (
                      <Check size={14} className="text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Anuluj
            </Button>

            <Button type="submit">
              <Save />
              Zapisz
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
