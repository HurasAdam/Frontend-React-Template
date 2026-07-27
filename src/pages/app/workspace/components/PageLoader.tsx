import { Loader2 } from "lucide-react";

export function PageLoader({ message = "Trwa ładowanie..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen  text-primary/70">
      <Loader2 className="w-20 h-20 animate-spin text-primary mb-6" />
      <p className="text-xl font-medium">{message}</p>
      <p className="text-sm text-muted-foreground mt-2">
        To może chwilę potrwać…
      </p>
    </div>
  );
}
