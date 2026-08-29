import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  FilePenLine,
  Folder,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../../../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { Input } from "../../../../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/ui/popover";
import { cn } from "../../../../../../lib/utils";
import type { IFolder } from "../../../../../../services/workspace-folders/types";
import { getFolderColorClasses } from "../../folders/modals/AddWorkspaceFolderModal";

const editWorkspaceArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Nazwa artykułu musi mieć co najmniej 3 znaki")
    .max(200, "Nazwa artykułu może mieć maksymalnie 200 znaków"),

  folderId: z.string().min(1, "Wybierz folder"),
});

type FormData = z.infer<typeof editWorkspaceArticleSchema>;

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;

  article: {
    id: string;
    title: string;
    folderId: string;
  };

  folders: IFolder[];

  onSave: (data: FormData) => Promise<unknown>;
};

export const EditWorkspaceArticleModal = ({
  isOpen,
  isPending,
  onClose,
  article,
  folders,
  onSave,
}: Props) => {
  const [isFolderPopoverOpen, setIsFolderPopoverOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editWorkspaceArticleSchema),
    defaultValues: {
      title: article.title,
      folderId: article.folderId,
    },
  });

  const selectedFolderId = watch("folderId");

  useEffect(() => {
    reset({
      title: article.title,
      folderId: article.folderId,
    });
  }, [article, reset]);

  const onSubmit = async (data: FormData) => {
    await onSave(data);
    reset(data);
  };

  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId,
  );

  const currentArticleFolder = folders.find(
    (folder) => folder.id === article.folderId,
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset({
            title: article.title,
            folderId: article.folderId,
          });

          onClose();
        }
      }}
    >
      <DialogContent
        className="
    sm:max-w-xl
    rounded-[28px]
    border-0
    bg-background
    p-0
    shadow-2xl
    
  "
      >
        {/* HEADER */}
        <div className="border-b   rounded-t-[28px] bg-muted/20 px-8 pt-8 pb-7">
          <DialogHeader>
            <div className="space-y-5">
              {/* LABEL */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  bg-background
                  px-3.5
                  py-1.5
                  text-[11px]
                  font-medium
                  tracking-[0.12em]
                  text-muted-foreground
                  shadow-sm
                "
              >
                <FilePenLine className="size-3.5" />
                EDYCJA ARTYKUŁU
              </div>

              {/* TITLE */}
              <div className="space-y-2">
                <DialogTitle
                  className="
                    text-[26px]
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  📝 Edytuj artykuł
                </DialogTitle>

                <p
                  className="
                    max-w-md
                    text-[14px]
                    leading-6
                    text-muted-foreground
                  "
                >
                  Zmień tytuł artykułu lub jego folder.
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 py-7">
          {/* TITLE */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="article-title" className="text-sm font-medium">
              Nazwa artykułu
            </label>

            <Input
              id="article-title"
              {...register("title")}
              disabled={isPending}
              placeholder="Wprowadź nazwę artykułu"
              className="h-11"
            />

            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* FOLDER */}
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="flex flex-col space-y-2">
                <label htmlFor="article-folder" className="text-sm font-medium">
                  Folder
                </label>

                <Popover
                  open={isFolderPopoverOpen}
                  onOpenChange={setIsFolderPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={isFolderPopoverOpen}
                      disabled={isPending || folders.length === 0}
                      className="h-11 w-full justify-between bg-background font-normal"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        📁
                        {selectedFolder ? (
                          <span className="truncate">
                            {selectedFolder.name}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Wybierz folder...
                          </span>
                        )}
                      </div>

                      <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-(--radix-popper-anchor-width) p-0"
                    align="start"
                    onWheel={(event) => event.stopPropagation()}
                  >
                    <Command>
                      <CommandInput placeholder="Wyszukaj folder..." />

                      <CommandList className="max-h-64 overflow-y-auto scrollbar-custom">
                        <CommandEmpty>
                          Brak folderów spełniających kryteria wyszukiwania.
                        </CommandEmpty>

                        <CommandGroup heading="Dostępne foldery">
                          {folders.map((folder) => {
                            const folderColor = getFolderColorClasses(
                              folder.color,
                            );

                            return (
                              <CommandItem
                                key={folder.id}
                                value={folder.name}
                                onSelect={() => {
                                  setValue("folderId", folder.id, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });

                                  setIsFolderPopoverOpen(false);
                                }}
                                className={cn(
                                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                                  selectedFolderId === folder.id
                                    ? folderColor.softClass
                                    : "hover:bg-accent/60",
                                )}
                              >
                                <div
                                  className={cn(
                                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                                    folderColor.softClass,
                                  )}
                                >
                                  <Folder className={cn("size-4")} />
                                </div>

                                <span className="flex-1 truncate font-medium">
                                  {folder.name}
                                </span>

                                <CheckIcon
                                  className={cn(
                                    "size-4 text-primary transition-opacity",
                                    selectedFolderId === folder.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {errors.folderId && (
                  <p className="text-xs text-destructive">
                    {errors.folderId.message}
                  </p>
                )}

                {folders.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Brak dostępnych folderów.
                  </p>
                )}
              </div>
            </div>

            {currentArticleFolder && (
              <p className="text-xs text-muted-foreground">
                Aktualny folder:{" "}
                <span className="font-medium text-foreground">
                  {currentArticleFolder.name}
                </span>
              </p>
            )}

            {errors.folderId && (
              <p className="text-xs text-destructive">
                {errors.folderId.message}
              </p>
            )}

            {folders.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Brak dostępnych folderów.
              </p>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
              disabled={isPending}
            >
              Anuluj
            </Button>

            <Button
              disabled={isPending || folders.length === 0}
              type="submit"
              size="lg"
            >
              {isPending ? (
                "Zapisywanie..."
              ) : (
                <>
                  <Save className="size-4" />
                  Zapisz zmiany
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
