import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Info, Loader, Pencil, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../components/ui/form";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";

export const updateWorkspaceArticleResponseVariantSchema = z.object({
  variantName: z
    .string()
    .trim()
    .min(1, "Podaj nazwę wersji")
    .max(100, "Nazwa może mieć maksymalnie 100 znaków"),

  variantContent: z
    .string()
    .trim()
    .min(1, "Podaj treść odpowiedzi")
    .max(10000, "Treść może mieć maksymalnie 10 000 znaków"),
});

export type UpdateWorkspaceArticleResponseVariantPayload = z.infer<
  typeof updateWorkspaceArticleResponseVariantSchema
>;

export interface ArticleResponseVariant {
  id: string;
  variantName: string;
  variantContent: string;
  order: number;
}

interface EditArticleResponseVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ArticleResponseVariant | null;
  closeOnOutsideClick?: boolean;
  onSubmitVariant: (
    variantId: string,
    data: UpdateWorkspaceArticleResponseVariantPayload,
    onSuccess: () => void,
  ) => void;
  isPending: boolean;
}

export const EditArticleResponseVariantModal = ({
  isOpen,
  onClose,
  variant,
  closeOnOutsideClick = true,
  onSubmitVariant,
  isPending,
}: EditArticleResponseVariantModalProps) => {
  const form = useForm({
    resolver: zodResolver(updateWorkspaceArticleResponseVariantSchema),
    defaultValues: {
      variantName: "",
      variantContent: "",
    },
  });

  useEffect(() => {
    if (!isOpen || !variant) return;

    form.reset({
      variantName: variant.variantName,
      variantContent: variant.variantContent,
    });
  }, [isOpen, variant, form]);

  const contentValue = form.watch("variantContent");
  const characterCount = contentValue?.length ?? 0;

  const handleClose = () => {
    if (isPending) return;

    form.reset({
      variantName: "",
      variantContent: "",
    });

    onClose();
  };

  const onSubmit = (data: UpdateWorkspaceArticleResponseVariantPayload) => {
    if (!variant) return;

    onSubmitVariant(variant.id, data, () => {
      form.reset({
        variantName: "",
        variantContent: "",
      });

      onClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      modal
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? {
              onPointerDownOutside: (event) => {
                event.preventDefault();
              },
            }
          : {})}
        className="w-[calc(100vw-2rem)] !max-w-[920px] max-h-[calc(100vh-1rem)] overflow-hidden rounded-3xl border border-border/60 bg-background p-0 shadow-2xl"
      >
        {/* HEADER */}
        <div className="relative shrink-0 border-b border-border/50 bg-gradient-to-br from-muted/30 via-background to-background px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <Pencil className="size-5" strokeWidth={1.8} />
            </div>

            <div className="flex-1 space-y-1">
              <DialogTitle className="text-xl font-semibold tracking-tight text-foreground">
                Edytuj wersję odpowiedzi
              </DialogTitle>

              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Zaktualizuj nazwę lub treść wariantu i dostosuj odpowiedź do
                aktualnych potrzeb zespołu.
              </p>
            </div>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto px-8 py-6 scrollbar-custom">
          <Form {...form}>
            <form
              id="edit-response-variant-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-7"
            >
              {/* VARIANT NAME */}
              <FormField
                control={form.control}
                name="variantName"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <FileText className="size-4" />
                      </div>

                      <FormLabel className="text-sm font-semibold text-foreground">
                        Nazwa wersji
                      </FormLabel>
                    </div>

                    <FormControl>
                      <div className="rounded-2xl border border-border/60 bg-card p-1 transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
                        <Input
                          {...field}
                          placeholder="Np. Wersja formalna, Wersja krótka, Odpowiedź e-mail..."
                          disabled={isPending}
                          className="h-12 rounded-xl border-0 bg-transparent px-4 text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="size-3.5" />

                      <span>
                        Nazwa wariantu szablonu widoczna dla pracownika.
                      </span>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONTENT */}
              <FormField
                control={form.control}
                name="variantContent"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                          <Pencil className="size-4" />
                        </div>

                        <FormLabel className="text-sm font-semibold text-foreground">
                          Treść odpowiedzi
                        </FormLabel>
                      </div>

                      <span
                        className={`text-xs tabular-nums transition-colors ${
                          characterCount > 9500
                            ? "font-medium text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {characterCount.toLocaleString("pl-PL")} / 10 000
                      </span>
                    </div>

                    <FormControl>
                      <div className="overflow-hidden rounded-l-xl rounded-r-lg  border border-border/60 bg-card transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
                        <Textarea
                          {...field}
                          placeholder="Wpisz treść wiadomości, którą pracownik może skopiować i wysłać klientowi..."
                          disabled={isPending}
                          className="h-[300px] max-h-[300px] resize-none overflow-y-auto rounded-none border-0 bg-transparent px-5 py-4 text-[15px] leading-7 placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-custom"
                        />

                        <div className="flex min-h-10 items-center justify-between border-t border-border/50 bg-muted/40 px-5">
                          <span className="text-xs text-muted-foreground">
                            Używaj pustych linii do rozdzielania akapitów.
                          </span>

                          <span
                            className={`text-xs tabular-nums transition-colors ${
                              characterCount > 9500
                                ? "font-medium text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {characterCount.toLocaleString("pl-PL")} znaków
                          </span>
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* FOOTER */}
        <DialogFooter className="shrink-0 gap-3 border-t border-border/50 bg-muted/30 px-8 py-5">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isPending}
            className="h-11 rounded-xl px-5 text-[15px] font-medium text-muted-foreground hover:text-foreground"
          >
            Anuluj
          </Button>

          <Button
            type="submit"
            form="edit-response-variant-form"
            disabled={isPending || !variant}
            className="h-11 min-w-[170px] gap-2 rounded-xl px-6 text-[15px] font-semibold shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px] hover:shadow-primary/30"
          >
            {isPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Zapisywanie...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Zapisz zmiany
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
