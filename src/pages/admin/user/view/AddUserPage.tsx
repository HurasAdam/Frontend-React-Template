import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Loader,
  Shield,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  createUserSchema,
  type CreateUserPayload,
} from "../../../../features/users/validation/create-user.schema";
import { useCreateUserMutation } from "../../../../hooks/admin/use-admin";
import { useFindRolesQuery } from "../../../../hooks/roles/queries/use-roles.queries";

interface Props {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const AddUserPage = ({ isSubmitting, onCancel }: Props) => {
  const { data: rolesList = [] } = useFindRolesQuery({});
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const { mutate } = useCreateUserMutation();

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    mode: "onChange",
  });

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    form.setValue("password", pass, { shouldValidate: true });
  };

  const copyPassword = async () => {
    const value = form.getValues("password");
    if (!value) return;

    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onSubmit = () => {
    const payload = form.getValues();

    mutate(payload);
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <UserPlus size={18} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Tworzenie użytkownika</h1>
          <p className="text-sm text-muted-foreground">
            Dodaj nowego użytkownika do systemu
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* BASIC */}
          <Card>
            <Section title="Podstawowe dane">
              <div className="grid grid-cols-2 gap-4 px-6 py-4">
                <Field
                  control={form.control}
                  name="name"
                  label="Imię"
                  placeholder="Jan"
                />

                <Field
                  control={form.control}
                  name="surname"
                  label="Nazwisko"
                  placeholder="Kowalski"
                />
              </div>

              <Divider />

              <div className="px-6 py-4">
                <Field
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="email@domain.com"
                />
              </div>
            </Section>
          </Card>

          {/* PASSWORD */}
          <Card>
            <Section title="Bezpieczeństwo">
              <div className="px-6 py-4 space-y-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hasło</FormLabel>

                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            placeholder="Wygeneruj hasło"
                          />
                        </FormControl>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={copyPassword}
                        >
                          <Copy size={16} />
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={generatePassword}
                        >
                          Generuj
                        </Button>
                      </div>

                      {copied ? (
                        <p className="text-xs text-green-500">
                          Skopiowano do schowka
                        </p>
                      ) : (
                        <p className="h-4" />
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Section>
          </Card>

          {/* ROLE + PHONE */}
          <Card>
            <Section title="Rola użytkownika">
              <div className="px-6 py-5 space-y-3">
                {rolesList.map((role) => {
                  const active = form.watch("role") === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() =>
                        form.setValue("role", role.id, {
                          shouldValidate: true,
                        })
                      }
                      className={`
              relative w-full flex items-center justify-between
              rounded-2xl border p-4 text-left transition-all
              hover:bg-muted/40
              ${
                active
                  ? "border-primary/70 bg-primary/5 shadow-sm"
                  : "border-border"
              }
            `}
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        {/* ICON */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border"
                          style={{
                            backgroundColor: `${role.labelColor}15`,
                            color: role.labelColor,
                            borderColor: `${role.labelColor}30`,
                          }}
                        >
                          <Shield size={18} />
                        </div>

                        {/* INFO */}
                        <div>
                          <p className="text-sm font-semibold">{role.name}</p>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {role.permissions.length} uprawnień
                            </span>

                            <span
                              className="w-1 h-1 rounded-full"
                              style={{
                                backgroundColor: role.labelColor,
                              }}
                            />

                            <span
                              className="text-[11px] font-medium"
                              style={{
                                color: role.labelColor,
                              }}
                            >
                              Active role
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        className={`
                w-5 h-5 rounded-full border flex items-center justify-center
                transition-all
                ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                }
              `}
                      >
                        {active && <Check size={12} />}
                      </div>

                      {/* ACTIVE RING */}
                      {active && (
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 pointer-events-none" />
                      )}
                    </button>
                  );
                })}

                {rolesList.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Brak dostępnych ról
                  </p>
                )}
              </div>
            </Section>
          </Card>

          {/* SUBMIT */}
          <div className="flex justify-end gap-4">
            <Button
              variant="ghost"
              type="button"
              className="min-w-[180px]"
              onClick={onCancel}
            >
              Anuluj
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              disabled={!form.formState.isValid || isSubmitting}
              className="min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Tworzenie...
                </>
              ) : (
                <>
                  <Check className="mr-2" />
                  Utwórz użytkownika
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

/* ================= UI HELPERS ================= */

const Card = ({ children }) => (
  <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <div className="px-6 py-4 border-b bg-muted/30">
      <p className="text-sm font-medium">{title}</p>
    </div>
    {children}
  </div>
);

const Divider = () => <div className="h-px bg-border mx-6" />;

const Field = ({ control, name, label, placeholder }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} placeholder={placeholder} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
