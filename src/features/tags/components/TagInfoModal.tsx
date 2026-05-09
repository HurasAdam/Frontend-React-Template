import { Calendar, Hash, Tag, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { formatDate } from "../../../lib/utils";

type TagType = {
  id: string;
  name: string;
  createdBy: {
    name: string;
    surname?: string;
    email?: string;
    avatar?: string;
  };
  createdAt: string;
};

type Props = {
  tag: TagType | null;
  isOpen: boolean;
  onClose: () => void;
};

export const TagInfoModal = ({ tag, isOpen, onClose }: Props) => {
  if (!tag) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl bg-background/80 backdrop-blur-xl shadow-2xl p-0 w-full sm:max-w-[520px]">
        {/* HEADER */}
        <div className="px-6 pt-6 pb-5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Tag className="w-5 h-5" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold">
                {tag.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Szczegóły tagu systemowego
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 space-y-5">
          {/* USER BLOCK */}
          <div className="flex items-center justify-between rounded-xl border bg-card p-3">
            <div className="flex items-center gap-3">
              {/* avatar placeholder */}
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Utworzony przez :
                </p>
                <p className="text-sm font-medium">{tag.createdBy.name}</p>
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
              <p className="text-sm mt-1">{formatDate(tag.createdAt)}</p>
            </div>

            <div className="rounded-xl border bg-card p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hash size={12} />
                ID tagu
              </div>
              <p className="text-xs mt-1 break-all text-muted-foreground">
                {tag.id}
              </p>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="rounded-xl border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tag jest używany do grupowania treści i umożliwia ich filtrowanie
              w systemie.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
