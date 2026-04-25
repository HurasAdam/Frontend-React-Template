import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Origami } from "lucide-react";
import { useForm } from "react-hook-form";
import { IMAGES } from "../../../../constants/images";

interface Props {
  onSubmit: (values: unknown) => void;
  isLoading: boolean;
  className?: string;
}

export function LoginForm({ className, onSubmit }: Props) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0 border-muted/40 shadow-xl rounded-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* FORM */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:px-12 py-16"
          >
            <FieldGroup className="gap-5">
              {/* HEADER */}
              <div className="flex flex-col items-center gap-5 mb-6 text-center">
                {/* ICON */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 rounded-full bg-primary/10 blur-2xl animate-pulse" />
                  <Origami className="w-8 h-8 text-primary relative" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                  Baza Wiedzy
                </h1>

                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Zaloguj się, aby uzyskać dostęp do swojej przestrzeni wiedzy
                </p>
              </div>

              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email">Adres e-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  required
                  {...form.register("email")}
                />
              </Field>

              {/* PASSWORD */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Hasło</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    Nie pamiętasz hasła?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register("password")}
                />
              </Field>

              {/* BUTTON */}
              <Field>
                <Button type="submit" className="w-full">
                  Zaloguj się
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card" />

              {/* SIGNUP */}
              <FieldDescription className="text-center">
                Nie masz konta?{" "}
                <a
                  href="#"
                  className="underline hover:text-foreground transition"
                >
                  Zarejestruj się
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* IMAGE */}
          <div className="relative hidden bg-muted md:block">
            <img
              src={IMAGES.login}
              alt="Login illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* FOOTER */}
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        Klikając „Zaloguj się”, akceptujesz{" "}
        <a href="#" className="underline hover:text-foreground transition">
          Regulamin
        </a>{" "}
        oraz{" "}
        <a href="#" className="underline hover:text-foreground transition">
          Politykę prywatności
        </a>
      </FieldDescription>
    </div>
  );
}
