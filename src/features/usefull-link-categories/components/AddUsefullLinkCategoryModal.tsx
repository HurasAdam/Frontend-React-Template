import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus, Info, Loader, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useCreateUsefullLinkCategoryAction } from "../../../hooks/usefullLink-categories/actions/use-create";
import {
  usefullLinkCategorySchema,
  type CreateUsefullLinkCategoryPayload,
} from "../validation/usefullLinkCategory.schema";

interface LinkFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
}

export const AddUsefullLinkCategoryModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick,
}: LinkFolderModalProps) => {
  const form = useForm<CreateUsefullLinkCategoryPayload>({
    resolver: zodResolver(usefullLinkCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { createUsefullLinkCategory, isPending } =
    useCreateUsefullLinkCategoryAction();

  const onSubmit = (data: CreateUsefullLinkCategoryPayload) => {
    createUsefullLinkCategory({
      data,
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="
          p-0
          w-full
          sm:max-w-[540px]
          rounded-2xl
          bg-background/80
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BadgePlus className="w-6 h-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Dodaj kategorię
              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">
                Utwórz nową kategorię dla przydatnych linków.
              </p>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border bg-muted/40 p-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />

            <p className="text-xs text-muted-foreground leading-relaxed">
              Kategorie pomagają utrzymać porządek w bazie linków oraz
              przyspieszają wyszukiwanie najważniejszych materiałów.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nazwa kategorii</FormLabel>

                    <FormControl>
                      <input
                        {...field}
                        placeholder="np. Procedury, Dokumentacja, Narzędzia..."
                        className="
                          w-full
                          rounded-xl
                          border
                          bg-background
                          px-3
                          py-2.5
                          text-sm
                          transition-all
                          focus:outline-none
                          focus:ring-2
                          focus:ring-primary
                          focus:border-primary
                        "
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Anuluj
                </Button>

                <Button type="submit" disabled={isPending} size="lg">
                  {isPending ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Tworzenie...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Utwórz
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
