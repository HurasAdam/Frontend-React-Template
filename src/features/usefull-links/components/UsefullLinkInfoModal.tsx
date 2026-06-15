import { Calendar, Hash, Tag, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useFindOneWithDetailsUsefullLinkQuery } from "../../../hooks/usefullLinks/queries/usefullLinks.queries";
import { formatDate } from "../../../lib/utils";
import type { ILink } from "../hooks/useUsefullLinkModal";

type Props = {
  link: ILink | null;
  isOpen: boolean;
  onClose: () => void;
};

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-md bg-muted/60 ${className}`} />
);

export const UsefullLinkInfoModal = ({ link, isOpen, onClose }: Props) => {
  const { data, isLoading } = useFindOneWithDetailsUsefullLinkQuery(link?.id);

  if (!link) return null;

  const loading = isLoading || !data;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl bg-background/80 backdrop-blur-xl shadow-2xl p-0 w-full sm:max-w-[600px]">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Tag className="w-5 h-5" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold">
                {link.name}
              </DialogTitle>

              <p className="text-sm text-muted-foreground">Szczegóły linku</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 space-y-5">
          {/* DESCRIPTION */}
          <div className="rounded-xl border bg-card/80 p-3">
            <p className="text-xs text-muted-foreground">Opis</p>

            {loading ? (
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <p className="text-sm mt-1 text-muted-foreground leading-relaxed">
                {data.description}
              </p>
            )}
          </div>

          {/* URL */}
          <div className="rounded-xl border bg-card p-3">
            <p className="text-xs text-muted-foreground">URL</p>

            {loading ? (
              <Skeleton className="h-3 w-3/4 mt-2" />
            ) : (
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary break-all hover:underline"
              >
                {data.url}
              </a>
            )}
          </div>

          {/* CREATED BY */}
          <div className="flex items-center justify-between rounded-xl border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Utworzony przez</p>

                {loading ? (
                  <Skeleton className="h-4 w-24 mt-1" />
                ) : (
                  <p className="text-sm font-medium">
                    {data.createdBy?.name} {data.createdBy?.surname}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* META GRID */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-card p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={12} />
                Utworzono
              </div>

              {loading ? (
                <Skeleton className="h-4 w-20 mt-2" />
              ) : (
                <p className="text-sm mt-1">{formatDate(data.createdAt)}</p>
              )}
            </div>

            <div className="rounded-xl border bg-card p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hash size={12} />
                ID
              </div>

              {loading ? (
                <Skeleton className="h-4 w-full mt-2" />
              ) : (
                <p className="text-xs mt-1 break-all text-muted-foreground">
                  {data.id}
                </p>
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="rounded-xl border bg-card p-3">
            <p className="text-xs text-muted-foreground">Kategoria</p>

            {loading ? (
              <Skeleton className="h-3 w-32 mt-2" />
            ) : (
              <p className="text-sm font-medium">
                {data.category?.name ?? "Brak kategorii"}
              </p>
            )}
          </div>

          {/* FEATURED */}
          <div className="rounded-xl border bg-card p-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Wyróżniony</span>

            {loading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              <span
                className={`text-xs font-medium ${
                  data.isFeatured ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {data.isFeatured ? "TAK" : "NIE"}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
