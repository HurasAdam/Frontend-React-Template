import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Fingerprint,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (values: unknown) => void;
  isLoading: boolean;
  className?: string;
}

export function AdminLoginForm({ className, onSubmit }: Props) {
  const form = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0 border-white/10 shadow-2xl shadow-black/40 rounded-2xl bg-card/80 backdrop-blur-xl">
        <CardContent className="p-0">
          {/* TOP ACCENT BAR */}
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-8 py-10 md:px-10"
          >
            {/* HEADER */}
            <div className="flex flex-col items-center gap-4 mb-10 text-center animate-fade-up">
              {/* ICON */}
              <div className="relative flex items-center justify-center mb-2">
                {/* PULSE RINGS */}
                <div className="absolute w-16 h-16 rounded-2xl border border-primary/30 animate-pulse-ring" />
                <div
                  className="absolute w-16 h-16 rounded-2xl border border-primary/20 animate-pulse-ring"
                  style={{ animationDelay: "1.25s" }}
                />
                {/* ROTATED FRAME */}
                <div className="absolute w-14 h-14 rounded-2xl bg-primary/10 rotate-45" />
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Panel Administratora
                </h1>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Strefa restricted — dostęp wyłącznie dla personelu
                  autoryzowanego
                </p>
              </div>
            </div>

            {/* FIELDS */}
            <div
              className="flex flex-col gap-5 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="admin-login" className="text-sm font-medium">
                  Adres e-mail
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-colors group-focus-within:text-foreground" />
                  <Input
                    id="admin-login"
                    type="text"
                    placeholder="admin@bazawiedzy.pl"
                    required
                    className="pl-9 h-11 bg-background/50"
                    {...form.register("login")}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Hasło
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-colors group-focus-within:text-foreground" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-9 pr-10 h-11 bg-background/50"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER + 2FA HINT */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="admin-remember" />
                  <Label
                    htmlFor="admin-remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Zapamiętaj urządzenie
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1.5"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  2FA
                </a>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full h-11 mt-1 relative overflow-hidden"
                size="lg"
              >
                <span
                  className={cn(
                    "absolute inset-0 animate-shimmer pointer-events-none",
                    !className?.includes("loading") && "",
                  )}
                />
                Zaloguj się jako administrator
              </Button>

              {/* BACK TO USER LOGIN */}
              <div className="pt-3 text-center">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Wróć do logowania użytkownika
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* SECURITY FOOTER */}
      <div
        className="flex items-center justify-center gap-2 px-6 text-center text-xs text-muted-foreground animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        <Lock className="w-3 h-3" />
        <span>
          Wszystkie logowania są monitorowane i rejestrowane w systemie
          bezpieczeństwa
        </span>
      </div>
    </div>
  );
}
