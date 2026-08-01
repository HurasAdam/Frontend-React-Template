import { FileText, Folder, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";

type Folder = {
  id: string;
  name: string;
  description: string;
};

interface Props {
  folders: Folder[];
  onEdit: (folder: Folder) => void;
  onDelete: (folder: Folder) => void;
}

export default function FolderListSection({
  folders,
  onEdit,
  onDelete,
}: Props) {
  const foldersWithArticles = folders.map((folder) => ({
    ...folder,
    articles: 0,
  }));

  return (
    <div className="space-y-2">
      {foldersWithArticles.map((folder) => (
        <div
          key={folder.id}
          className="
            group
            cursor-pointer
            rounded-xl
            border
            bg-card
            px-5
            py-4
            transition-all
            hover:border-primary/25
            hover:shadow-sm
          "
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
              >
                <Folder size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{folder.name}</h3>

                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {folder.description || "Brak opisu"}
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-muted-foreground
                  "
                >
                  <FileText size={13} />
                  {folder.articles} artykułów
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(folder);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edytuj
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(folder);
                }}
                className="
                  opacity-60
                  transition-opacity
                  hover:text-destructive
                  group-hover:opacity-100
                "
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
