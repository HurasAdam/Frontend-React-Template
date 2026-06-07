import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, User, UserPen } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { useUpdateUserAction } from "../../../../hooks/admin/actions/use-update-user.action";
import {
  editUserSchema,
  type EditUserPayload,
} from "../validation/edit-user.schema";

interface Props {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  } | null;
}

export const EditUserModal = ({
  isOpen,
  closeOnOutsideClick,
  onClose,
  user,
}: Props) => {
  const { updateUser, isPending } = useUpdateUserAction();

  const form = useForm<EditUserPayload>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      surname: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen && user) {
      form.reset({
        name: user.name,
        surname: user.surname,
      });
    }
  }, [isOpen, user, form]);

  const handleClose = () => {
    form.reset({
      name: user?.name ?? "",
      surname: user?.surname ?? "",
    });

    onClose();
  };

  const name = form.watch("name");
  const surname = form.watch("surname");

  const hasChanges =
    name?.trim() !== (user?.name ?? "") ||
    surname?.trim() !== (user?.surname ?? "");

  const onSubmit = (data: EditUserPayload) => {
    if (!user || !hasChanges) return;

    updateUser({
      id: user.id,
      payload: data,
      onSuccess: () => {
        handleClose();
        toast.success("Dane zostały zaktualizowne");
      },
      onError: () => {
        handleClose();
        toast.error("Nie udało się zaktualizować użytkownika");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        {...(!closeOnOutsideClick
          ? { onInteractOutside: (e) => e.preventDefault() }
          : {})}
        className="sm:max-w-[500px] rounded-2xl border-0 bg-background text-foreground shadow-2xl p-0 overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-4 border-b border-border bg-muted/20">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <UserPen className="size-4 text-muted-foreground" />
              </div>

              <div>
                <DialogTitle className="text-base font-medium tracking-tight">
                  Edycja użytkownika
                </DialogTitle>

                {user && (
                  <p className="text-xs text-muted-foreground">
                    {user.name} • {user.surname}
                  </p>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-6 py-5 space-y-4"
          >
            {/* USER CARD */}
            <div className="rounded-2xl bg-muted/20 p-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="size-5 text-muted-foreground" />
                </div>

                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-sm font-medium">{user?.surname}</p>
                  </div>

                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-2xl bg-muted/20 p-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background"
                        placeholder="Wprowadź imię"
                        autoFocus
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background"
                        placeholder="Wprowadź nazwisko"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={handleClose}
              >
                Anuluj
              </Button>

              <Button
                type="submit"
                className="flex-1"
                disabled={!hasChanges || !form.formState.isValid || isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Zapisz zmiany
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
