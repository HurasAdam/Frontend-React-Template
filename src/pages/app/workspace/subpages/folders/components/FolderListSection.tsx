import { FileText, Folder, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "../../../../../../components/ui/button";

type Folder = {
  id: string;
  name: string;
  description: string;
  color: string;
  articleCount: number;
};

interface Props {
  folders: Folder[];
  onEdit: (folder: Folder) => void;
  onDelete: (folder: Folder) => void;
  onAdd: () => void;
}

const FOLDER_COLORS: Record<
  string,
  {
    icon: string;
    background: string;
  }
> = {
  blue: {
    icon: "text-blue-500",
    background: "bg-blue-500/10",
  },
  orange: {
    icon: "text-orange-500",
    background: "bg-orange-500/10",
  },
  emerald: {
    icon: "text-emerald-500",
    background: "bg-emerald-500/10",
  },
  rose: {
    icon: "text-rose-500",
    background: "bg-rose-500/10",
  },
  amber: {
    icon: "text-amber-500",
    background: "bg-amber-500/10",
  },
};

const DEFAULT_FOLDER_COLOR = {
  icon: "text-primary",
  background: "bg-primary/10",
};

function getFolderColor(color: string) {
  return FOLDER_COLORS[color] ?? DEFAULT_FOLDER_COLOR;
}

function getArticleLabel(count: number) {
  if (count === 1) return "artykuł";

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    !(count % 100 >= 12 && count % 100 <= 14)
  ) {
    return "artykuły";
  }

  return "artykułów";
}

export default function FolderListSection({
  folders,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {/* Add folder */}
      <button
        type="button"
        onClick={onAdd}
        className="
          group
          flex
          min-h-[180px]
          flex-col
          items-center
          justify-center
          gap-3
          rounded-2xl
          border-2
          border-dashed
          border-border
          bg-primary/5
          p-8
          transition-all
          duration-200
          hover:border-primary
          hover:bg-primary/5
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring/50
        "
      >
        <div
          className="
            flex
            size-12
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            transition-colors
            group-hover:bg-primary/20
          "
        >
          <Plus className="size-6 text-primary" />
        </div>

        <span className="font-medium text-foreground">Dodaj folder</span>

        <span className="text-center text-sm text-muted-foreground">
          Utwórz folder, aby uporządkować artykuły.
        </span>
      </button>

      {/* Folders */}
      {folders.map((folder) => {
        const color = getFolderColor(folder.color);

        return (
          <div
            key={folder.id}
            className="
              group
              cursor-pointer
              rounded-xl
              border
              bg-card
              transition-all
              duration-200
              hover:border-primary/30
              hover:shadow-md
            "
          >
            <div className="p-5">
              <div className="flex items-start gap-3">
                {/* Folder icon */}
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${color.background}
                  `}
                >
                  <Folder className={`h-5 w-5 ${color.icon}`} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="
                        line-clamp-1
                        text-sm
                        font-semibold
                        text-foreground
                        transition-colors
                        group-hover:text-primary
                      "
                    >
                      {folder.name}
                    </h3>

                    {/* Actions */}
                    <div
                      className="
                        -mr-1
                        -mt-1
                        flex
                        shrink-0
                        items-center
                        gap-0.5
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                      "
                    >
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(folder);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="
                          h-7
                          w-7
                          text-muted-foreground
                          hover:text-destructive
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(folder);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {folder.description || "Brak opisu folderu"}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />

                      <span>
                        {folder.articleCount}{" "}
                        {getArticleLabel(folder.articleCount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
