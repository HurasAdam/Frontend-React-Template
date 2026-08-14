import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateVariant = "default" | "muted" | "destructive";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  variant?: EmptyStateVariant;
  className?: string;
}

const VARIANT_STYLES: Record<
  EmptyStateVariant,
  {
    glow: string;
    ring: string;
    iconBg: string;
    iconColor: string;
    button:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  }
> = {
  default: {
    glow: "bg-primary/[0.04]",
    ring: "border-primary/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    button: "default",
  },
  muted: {
    glow: "bg-muted",
    ring: "border-border",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    button: "outline",
  },
  destructive: {
    glow: "bg-destructive/[0.05]",
    ring: "border-destructive/10",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    button: "destructive",
  },
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "default",
  className,
}: EmptyStateProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card shadow-sm",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-empty-state-glow",
            styles.glow,
          )}
        />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border",
            styles.ring,
          )}
        />
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50" />
      </div>

      <div className="relative flex animate-empty-state-in flex-col items-center px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              styles.iconBg,
            )}
          >
            <Icon className={cn("h-5 w-5", styles.iconColor)} strokeWidth={2} />
          </div>
        </div>

        <div className="mt-6 max-w-sm">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <Button
          type="button"
          variant={styles.button}
          onClick={onAction}
          className="group mt-7 gap-2"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
