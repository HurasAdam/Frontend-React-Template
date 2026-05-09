import type { AxiosError } from "axios";
import { Info, Tag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import queryClient from "../../../config/query.config";
import { useCreateTagMutation } from "../../../hooks/tags/use-tags";
import type { CreateTagPayload } from "../validation/tag.schema";
import { TagForm } from "./TagForm";

interface CreateWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
}

export const AddTagModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick,
}: CreateWorkspaceProps) => {
  const { mutate, isPending } = useCreateTagMutation();

  const onSubmit = (data: CreateTagPayload) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        toast.success("Dodano nowy produkt", {
          position: "bottom-right",
        });
      },
      onError: (error) => {
        const { status } = error as AxiosError;

        if (status === 403) {
          toast.error("Brak uprawnień", {
            description:
              "Nie posiadasz wymaganych uprawnień do wykonania tej operacji.",
            position: "bottom-right",
            duration: 7000,
          });
          return;
        }

        if (status === 409) {
          toast.error("Niepowodzenie", {
            description:
              "Tag o tej nazwie już istnieje. Nazwa tagu musi być unikalna.",
            position: "bottom-right",
            duration: 7000,
          });
          return;
        }

        toast.error("Wystąpił błąd serwera", {
          position: "bottom-right",
        });
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={true}
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="
    max-h-[85vh] overflow-y-auto
    rounded-2xl
    bg-background/80
    backdrop-blur-xl
    shadow-2xl
    p-0
    w-full
    sm:max-w-[640px]
    lg:max-w-lg
  "
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-start gap-3">
            {/* ICON */}
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Tag className="w-6 h-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Nowy tag
              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">
                Dodaj nowy tag
              </p>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="mt-4 flex items-start gap-2 rounded-xl border bg-muted/40 p-3">
            <Info className="w-7 h-7 text-primary" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tagi usprawniają kategoryzację artykułów i umożliwają ich prostsze
              wyszukiwanie i organizację.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 pb-4 pt-2">
          <TagForm
            defaultValues={{ name: "" }}
            onSubmit={onSubmit}
            submitText="Utwórz tag"
            isSubmitting={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
