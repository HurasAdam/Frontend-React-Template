import { type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function Header({ title, description, icon: Icon }: Props) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Icon size={18} />
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
