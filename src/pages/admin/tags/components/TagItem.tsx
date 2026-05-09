import { Eye, Hash, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { ITag } from "../../../../features/tags/hooks/useTagModal";

export const TagItem = ({
  tag,
  openInfo,
  openEdit,
}: {
  tag: ITag;
  openInfo: (tag: ITag) => void;
  openEdit: (id: string) => void;
}) => {
  return (
    <div className="group rounded-2xl border bg-card p-4 hover:bg-accent/40 transition">
      <div className="flex items-center justify-between">
        <button
          onClick={() => openInfo(tag)}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
            <Hash size={14} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">{tag.name}</span>
            <span className="text-xs text-muted-foreground">tag systemowy</span>
          </div>
        </button>

        {/* <TagActionsDropdown tag={tag} openInfo={openInfo} /> */}

        {/* RIGHT - dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-muted">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="text-xs border-b pb-2  text-muted-foreground">
              Dostępne opcje :
            </DropdownMenuLabel>

            <DropdownMenuGroup className="space-y-0.5">
              <DropdownMenuItem
                onClick={() => openInfo(tag)}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 opacity-70" />
                <span>Szczegóły</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => openEdit(tag.id)}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >
                <Pencil className="w-4 h-4 opacity-70" />
                <span>Edytuj</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-3 py-2 text-red-500 cursor-pointer">
                <Trash2 className="w-4 h-4 opacity-70" />
                <span>Usuń</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
