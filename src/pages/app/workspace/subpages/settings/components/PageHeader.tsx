import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  actions?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
}: Props) {
  return (
    <header className="mb-10 flex items-start justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon size={18} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
