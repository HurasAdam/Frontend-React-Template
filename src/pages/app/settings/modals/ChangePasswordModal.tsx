import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Wprowadź aktualne hasło."),
    newPassword: z
      .string()
      .min(8, "Nowe hasło musi zawierać co najmniej 8 znaków.")
      .max(128, "Nowe hasło może mieć maksymalnie 128 znaków."),
    confirmPassword: z.string().min(1, "Potwierdź nowe hasło."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Podane hasła nie są identyczne.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Nowe hasło musi różnić się od aktualnego.",
    path: ["newPassword"],
  });

type FormData = z.infer<typeof changePasswordSchema>;

interface Props {
  isOpen: boolean;
  closeOnOutsideClick?: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export function ChangePasswordModal({
  isOpen,
  closeOnOutsideClick,
  isPending,
  onClose,
  onSubmit,
}: Props) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,

    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleFormSubmit = async (data: FormData) => {
    setError("");
    clearErrors("currentPassword");

    await onSubmit({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const isFormPending = isPending || isSubmitting;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isFormPending) {
          reset();
          setError("");
          onClose();
        }
      }}
    >
      <DialogContent
        {...(!closeOnOutsideClick
          ? {
              onPointerDownOutside: (event) => {
                event.preventDefault();
              },
            }
          : {})}
        className="gap-0 overflow-hidden rounded-[22px] border border-border/70 bg-card p-0 shadow-[0_32px_80px_-32px_oklch(0.2_0.04_265/0.35)] sm:max-w-[460px]"
      >
        {/* HEADER */}
        <div className="border-b border-border/60 bg-linear-to-br from-violet-500/[0.06] to-transparent px-6 py-5 sm:px-7">
          <DialogHeader className="space-y-0 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <KeyRound className="size-4" />
              </div>

              <div className="min-w-0 space-y-1">
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  Zmień hasło
                </DialogTitle>

                <DialogDescription className="text-xs leading-5">
                  Zaktualizuj hasło do swojego konta.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-5 px-6 py-6 sm:px-7">
            {/* CURRENT PASSWORD */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <LockKeyhole className="size-4" />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold">Aktualne hasło</h3>
                  <p className="text-xs text-muted-foreground">
                    Potwierdź swoją tożsamość.
                  </p>
                </div>
              </div>

              <PasswordField
                id="currentPassword"
                label="Hasło"
                placeholder="Wprowadź aktualne hasło"
                autoComplete="current-password"
                autoFocus
                error={errors.currentPassword?.message}
                disabled={isFormPending}
                {...register("currentPassword")}
              />
            </section>

            <div className="h-px bg-border/60" />

            {/* NEW PASSWORD */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                  <ShieldCheck className="size-4" />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold">Nowe hasło</h3>
                  <p className="text-xs text-muted-foreground">
                    Ustaw nowe dane logowania.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <PasswordField
                  id="newPassword"
                  label="Nowe hasło"
                  placeholder="Wprowadź nowe hasło"
                  autoComplete="new-password"
                  error={errors.newPassword?.message}
                  disabled={isFormPending}
                  {...register("newPassword")}
                />

                <PasswordField
                  id="confirmPassword"
                  label="Potwierdź nowe hasło"
                  placeholder="Powtórz nowe hasło"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  disabled={isFormPending}
                  {...register("confirmPassword")}
                />
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div className="space-y-1">
                  <p className="text-xs font-medium">
                    Wymagania dotyczące hasła
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Hasło powinno zawierać co najmniej 8 znaków. Unikaj łatwych
                    do odgadnięcia kombinacji.
                  </p>
                </div>
              </div>
            </section>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <p className="text-xs leading-5 text-destructive" role="alert">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <DialogFooter className="border-t border-border/60 bg-muted/30 px-6 py-4 sm:px-7">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-xl"
              onClick={onClose}
              disabled={isFormPending}
            >
              Anuluj
            </Button>

            <Button
              type="submit"
              size="lg"
              disabled={isFormPending}
              className="rounded-xl px-5"
            >
              {isFormPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Zapisywanie...
                </>
              ) : (
                <>
                  <LockKeyhole className="size-4" />
                  Zmień hasło
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  autoFocus?: boolean;
  error?: string;
  disabled?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id,
      label,
      placeholder,
      autoComplete,
      autoFocus,
      error,
      disabled,
      name,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-[13px] font-medium text-foreground">
          {label}
        </Label>

        <div className="relative">
          <Input
            ref={ref}
            id={id}
            name={name}
            type={visible ? "text" : "password"}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            disabled={disabled}
            aria-invalid={!!error}
            className="h-11 rounded-xl border-border/70 bg-background pr-11 text-sm shadow-none transition-colors focus-visible:border-primary/50 focus-visible:ring-primary/15"
          />

          <button
            type="button"
            disabled={disabled}
            onClick={() => setVisible((previous) => !previous)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
          >
            {visible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
