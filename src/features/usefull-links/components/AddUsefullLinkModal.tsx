import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Link as LinkIcon, Loader, Save, Star } from "lucide-react";
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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { Textarea } from "../../../components/ui/textarea";
import { useFindUsefullLinkCategoriesQuery } from "../../../hooks/usefullLink-categories/queries/use-usefullLink-categories.queries";
import { useCreateUsefullLinkAction } from "../../../hooks/usefullLinks/actions/use-create";
import {
  usefulLinkSchema,
  type CreateUsefullLinkPayload,
} from "../validation/usefullLink.schema";

interface UsefulLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
}

export const AddUsefulLinkModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick,
}: UsefulLinkModalProps) => {
  const { data: usefulLinkCategories } = useFindUsefullLinkCategoriesQuery();
  const { createUsefullLink, isPending } = useCreateUsefullLinkAction();

  const form = useForm<CreateUsefullLinkPayload>({
    resolver: zodResolver(usefulLinkSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      linkCategory: "",
      isFeatured: false,
    },
  });

  const onSubmit = (data: CreateUsefullLinkPayload) => {
    createUsefullLink({
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
          max-h-[85vh]
          overflow-y-auto
          rounded-2xl
          bg-background/80
          backdrop-blur-xl
          shadow-2xl
          p-0
          w-full
          sm:max-w-[640px]
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <LinkIcon className="w-6 h-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Dodaj przydatny link
              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">
                Dodaj nowy link i przypisz go do odpowiedniej kategorii.
              </p>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="mt-4 flex items-start gap-2 rounded-xl border bg-muted/40 p-3">
            <Info className="w-7 h-7 text-primary shrink-0" />

            <p className="text-xs text-muted-foreground leading-relaxed">
              Przydatne linki umożliwiają szybki dostęp do dokumentacji,
              narzędzi, procedur oraz innych często wykorzystywanych zasobów.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 pb-5 pt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa linku</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="np. Dokumentacja API" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres URL</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis (opcjonalnie)</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Krótki opis linku do zasobu..."
                        className="resize-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CATEGORY */}
              <FormField
                control={form.control}
                name="linkCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoria</FormLabel>

                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>

                        <SelectContent>
                          {usefulLinkCategories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FEATURED */}
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border rounded-xl bg-muted/20 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <Star
                              className={`h-5 w-5 mt-0.5 ${
                                field.value
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />

                            <div>
                              <Label
                                htmlFor={field.name}
                                className="font-medium"
                              >
                                Wyróżnij link
                              </Label>

                              <p className="mt-1 text-xs text-muted-foreground">
                                Wyróżnione linki będą wyświetlane wyżej i
                                łatwiej dostępne dla użytkowników.
                              </p>
                            </div>
                          </div>

                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-3">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Anuluj
                </Button>

                <Button type="submit" disabled={isPending} className="gap-2">
                  {isPending ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Zapisywanie...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Zapisz link
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
