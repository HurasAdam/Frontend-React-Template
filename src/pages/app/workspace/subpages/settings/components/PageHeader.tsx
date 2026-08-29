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
  const truncatedTitle =
    title.length > 140 ? `${title.slice(0, 137)}...` : title;

  return (
    <header className="mb-10 flex items-start justify-between gap-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-semibold" title={title}>
            {truncatedTitle}
          </h1>

          <p className="text-[13px] text-muted-foreground">{description}</p>
        </div>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
