import type { AxiosError } from "axios";
import { Info, Tag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import queryClient from "../../../config/query.config";

import { useUpdateTagMutation } from "../../../hooks/tags/mutations/use-tags.mutations";
import { useFindOneTagQuery } from "../../../hooks/tags/queries/use-tags.queries";
import type { CreateTagPayload } from "../validation/tag.schema";
import { TagForm } from "./TagForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tagId: string | null;
  closeOnOutsideClick?: boolean;
}

export const EditTagModal = ({
  isOpen,
  onClose,
  tagId,
  closeOnOutsideClick,
}: Props) => {
  const { data: tag, isLoading } = useFindOneTagQuery(tagId);
  const { mutate, isPending } = useUpdateTagMutation();

  const onSubmit = (data: CreateTagPayload) => {
    if (!tag) return;
    mutate(
      {
        id: tag.id,
        data,
      },
      {
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
      },
    );
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
    sm:max-w-160
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
                Edytuj tag
              </DialogTitle>

              {isLoading ? (
                <div className="space-y-4 animate-pulse mt-2">
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  {tag && tag.name}
                </p>
              )}
            </div>
          </div>

          {/* INFO BOX */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border bg-muted/40 p-3">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wprowadź zmiany w nazwie tagu i zapisz, aby zaktualizować dane.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 pb-4 pt-2 min-h-55">
          {!tag ? (
            <LoadingStateSkeleton />
          ) : (
            <TagForm
              defaultValues={{ name: tag.name }}
              onSubmit={onSubmit}
              submitText="Zapisz zmiany"
              isSubmitting={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Loading skeleton component
 */

const LoadingStateSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse mt-2">
      <div className="h-4 w-24 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 w-32 bg-muted rounded ml-auto" />
    </div>
  );
};
