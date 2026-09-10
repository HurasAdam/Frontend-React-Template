import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  GraduationCap,
  Headphones,
  Library,
  Plus,
  Search,
  Server,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

type CommandView = "root" | "workspaces" | "folders" | "folder" | "articles";

type MockWorkspace = {
  id: string;
  name: string;
  description: string;
  icon: typeof BookOpen;
};

type MockArticle = {
  id: string;
  title: string;
  folderId: string;
  folderName: string;
  tags: string[];
};

type MockFolder = {
  id: string;
  name: string;
  articlesCount: number;
};

type MockAction = {
  id: string;
  label: string;
  description: string;
  icon: typeof Plus;
};

type WorkspaceCommandMenuProps = {
  onOpenArticle?: (articleId: string) => void;
  onOpenFolder?: (folderId: string) => void;
  onSwitchWorkspace?: (workspaceId: string) => void;
};

/* -------------------------------------------------------------------------- */
/* Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const mockWorkspaces: MockWorkspace[] = [
  {
    id: "workspace-1",
    name: "Baza wiedzy",
    description: "Główna baza wiedzy IT",
    icon: BookOpen,
  },
  {
    id: "workspace-2",
    name: "Pomoc techniczna",
    description: "Procedury dla helpdesku",
    icon: Headphones,
  },
  {
    id: "workspace-3",
    name: "Dokumentacja IT",
    description: "Dokumentacja infrastruktury",
    icon: Server,
  },
  {
    id: "workspace-4",
    name: "Procedury szkolne",
    description: "Procedury i instrukcje",
    icon: GraduationCap,
  },
];

const mockFolders: MockFolder[] = [
  {
    id: "folder-1",
    name: "Konta i logowanie",
    articlesCount: 18,
  },
  {
    id: "folder-2",
    name: "Drukarki",
    articlesCount: 12,
  },
  {
    id: "folder-3",
    name: "Microsoft 365",
    articlesCount: 24,
  },
  {
    id: "folder-4",
    name: "Sieć",
    articlesCount: 16,
  },
  {
    id: "folder-5",
    name: "Sprzęt",
    articlesCount: 21,
  },
];

const mockArticles: MockArticle[] = [
  {
    id: "article-1",
    title: "Resetowanie hasła",
    folderId: "folder-1",
    folderName: "Konta i logowanie",
    tags: ["hasło", "reset", "konto", "logowanie"],
  },
  {
    id: "article-2",
    title: "Odblokowanie konta użytkownika",
    folderId: "folder-1",
    folderName: "Konta i logowanie",
    tags: ["konto", "blokada", "logowanie"],
  },
  {
    id: "article-3",
    title: "Zmiana hasła do konta",
    folderId: "folder-1",
    folderName: "Konta i logowanie",
    tags: ["hasło", "zmiana", "konto"],
  },
  {
    id: "article-4",
    title: "Drukarka nie drukuje",
    folderId: "folder-2",
    folderName: "Drukarki",
    tags: ["drukarka", "drukowanie", "błąd"],
  },
  {
    id: "article-5",
    title: "Instalacja drukarki sieciowej",
    folderId: "folder-2",
    folderName: "Drukarki",
    tags: ["drukarka", "instalacja", "sieć"],
  },
  {
    id: "article-6",
    title: "Dodanie drukarki na komputerze",
    folderId: "folder-2",
    folderName: "Drukarki",
    tags: ["drukarka", "dodanie", "konfiguracja"],
  },
  {
    id: "article-7",
    title: "Konfiguracja Outlooka",
    folderId: "folder-3",
    folderName: "Microsoft 365",
    tags: ["outlook", "poczta", "konfiguracja"],
  },
  {
    id: "article-8",
    title: "Problem z wysyłaniem wiadomości",
    folderId: "folder-3",
    folderName: "Microsoft 365",
    tags: ["outlook", "poczta", "wysyłanie"],
  },
  {
    id: "article-9",
    title: "Brak dostępu do internetu",
    folderId: "folder-4",
    folderName: "Sieć",
    tags: ["internet", "sieć", "wifi"],
  },
  {
    id: "article-10",
    title: "Konfiguracja Wi-Fi",
    folderId: "folder-4",
    folderName: "Sieć",
    tags: ["wifi", "sieć", "konfiguracja"],
  },
  {
    id: "article-11",
    title: "Komputer nie uruchamia się",
    folderId: "folder-5",
    folderName: "Sprzęt",
    tags: ["komputer", "uruchamianie", "sprzęt"],
  },
];

const mockRecentArticles = [mockArticles[0], mockArticles[3], mockArticles[6]];

const mockActions: MockAction[] = [
  {
    id: "create-article",
    label: "Dodaj artykuł",
    description: "Utwórz nowy artykuł w bazie wiedzy",
    icon: Plus,
  },
  {
    id: "create-folder",
    label: "Utwórz folder",
    description: "Dodaj nowy folder do kolekcji",
    icon: FolderOpen,
  },
  {
    id: "members",
    label: "Dostęp i uprawnienia",
    description: "Zarządzaj dostępem do kolekcji",
    icon: Users,
  },
  {
    id: "settings",
    label: "Ustawienia kolekcji",
    description: "Zmień ustawienia bieżącej kolekcji",
    icon: Settings,
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function WorkspaceCommandMenu({
  onOpenArticle,
  onOpenFolder,
  onSwitchWorkspace,
}: WorkspaceCommandMenuProps) {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  /**
   * Historia widoków.
   *
   * Przykład:
   *
   * ["root"]
   * ["root", "folders"]
   * ["root", "folders", "folder"]
   */
  const [viewStack, setViewStack] = useState<CommandView[]>(["root"]);

  const [selectedFolder, setSelectedFolder] = useState<MockFolder | null>(null);

  const view = viewStack[viewStack.length - 1];

  const canGoBack = viewStack.length > 1;

  const normalizedQuery = query.trim().toLowerCase();

  /* ------------------------------------------------------------------------ */
  /* Open with F                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "f") {
        return;
      }

      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      event.preventDefault();

      setOpen((current) => {
        const nextOpen = !current;

        if (nextOpen) {
          setViewStack(["root"]);
          setQuery("");
          setSelectedFolder(null);
        }

        return nextOpen;
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Back with ArrowLeft                                                       */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open || event.key !== "ArrowLeft") {
        return;
      }

      if (!canGoBack) {
        return;
      }

      /**
       * Najważniejsza rzecz:
       *
       * CommandInput ma cały czas fokus.
       *
       * Dlatego NIE sprawdzamy:
       *
       * target.tagName === "INPUT"
       *
       * ponieważ wtedy ArrowLeft nigdy nie zadziała.
       *
       * Gdy query jest puste:
       *   ArrowLeft = wróć
       *
       * Gdy query zawiera tekst:
       *   ArrowLeft = normalne przesuwanie kursora
       */
      if (query.length > 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      goBack();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, canGoBack, query]);

  /* ------------------------------------------------------------------------ */
  /* Reset after close                                                         */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!open) {
      setQuery("");
      setViewStack(["root"]);
      setSelectedFolder(null);
    }
  }, [open]);

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                                */
  /* ------------------------------------------------------------------------ */

  const enterView = (nextView: CommandView) => {
    setQuery("");

    setViewStack((current) => [...current, nextView]);
  };

  function goBack() {
    setQuery("");

    setViewStack((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.slice(0, -1);
    });
  }

  const close = () => {
    setOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /* Article handlers                                                          */
  /* ------------------------------------------------------------------------ */

  const handleOpenArticle = (articleId: string) => {
    close();
    onOpenArticle?.(articleId);
  };

  /* ------------------------------------------------------------------------ */
  /* Folder handlers                                                           */
  /* ------------------------------------------------------------------------ */

  const handleEnterFolder = (folder: MockFolder) => {
    setSelectedFolder(folder);
    setQuery("");

    setViewStack((current) => [...current, "folder"]);
  };

  const handleOpenFolder = (folderId: string) => {
    const folder = mockFolders.find((item) => item.id === folderId);

    if (!folder) {
      return;
    }

    handleEnterFolder(folder);
  };

  /* ------------------------------------------------------------------------ */
  /* Workspace handler                                                        */
  /* ------------------------------------------------------------------------ */

  const handleSwitchWorkspace = (workspaceId: string) => {
    close();
    onSwitchWorkspace?.(workspaceId);
  };

  /* ------------------------------------------------------------------------ */
  /* Filtering                                                                 */
  /* ------------------------------------------------------------------------ */

  const filteredArticles = useMemo(() => {
    let articles = mockArticles;

    if (view === "folder" && selectedFolder) {
      articles = articles.filter(
        (article) => article.folderId === selectedFolder.id,
      );
    }

    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((article) => {
      const searchableText = [
        article.title,
        article.folderName,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, selectedFolder, view]);

  const filteredFolders = useMemo(() => {
    if (!normalizedQuery) {
      return mockFolders;
    }

    return mockFolders.filter((folder) =>
      folder.name.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredWorkspaces = useMemo(() => {
    if (!normalizedQuery) {
      return mockWorkspaces;
    }

    return mockWorkspaces.filter((workspace) => {
      const searchableText =
        `${workspace.name} ${workspace.description}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const filteredActions = useMemo(() => {
    if (!normalizedQuery) {
      return mockActions;
    }

    return mockActions.filter((action) => {
      const searchableText =
        `${action.label} ${action.description}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  /* ------------------------------------------------------------------------ */
  /* Labels                                                                    */
  /* ------------------------------------------------------------------------ */

  const getViewTitle = () => {
    switch (view) {
      case "workspaces":
        return "Przełącz kolekcję";

      case "folders":
        return "Przejdź do folderu";

      case "folder":
        return selectedFolder?.name ?? "Folder";

      case "articles":
        return "Znajdź artykuł";

      default:
        return null;
    }
  };

  const getPlaceholder = () => {
    switch (view) {
      case "workspaces":
        return "Szukaj kolekcji...";

      case "folders":
        return "Szukaj folderu...";

      case "folder":
        return selectedFolder
          ? `Szukaj w folderze „${selectedFolder.name}”...`
          : "Szukaj artykułu...";

      case "articles":
        return "Szukaj artykułu...";

      default:
        return "Szukaj lub przejdź...";
    }
  };

  const isRoot = view === "root";

  const folderArticlesCount = selectedFolder
    ? mockArticles.filter((article) => article.folderId === selectedFolder.id)
        .length
    : 0;

  /* ------------------------------------------------------------------------ */
  /* Render                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "overflow-hidden p-0",
          "w-[calc(100%-2rem)] max-w-[680px]",
          "gap-0 rounded-xl border-border/60",
          "shadow-2xl",
        )}
      >
        <DialogTitle className="sr-only">Centrum nawigacji</DialogTitle>

        <Command shouldFilter={false} className="rounded-xl bg-background">
          {/* ================================================================ */}
          {/* SEARCH HEADER                                                     */}
          {/* ================================================================ */}

          <div className="relative">
            {canGoBack && (
              <button
                type="button"
                aria-label="Wróć"
                onPointerDown={(event) => {
                  /**
                   * Nie pozwalamy CommandInput przejąć
                   * zdarzenia zanim kliknięcie zostanie
                   * obsłużone przez przycisk.
                   */
                  event.preventDefault();
                }}
                onClick={goBack}
                className={cn(
                  "absolute left-3 top-1/2 z-20",
                  "-translate-y-1/2",
                  "flex size-8 items-center justify-center",
                  "rounded-md",
                  "text-muted-foreground",
                  "transition-colors",
                  "hover:bg-muted",
                  "hover:text-foreground",
                  "focus:outline-none",
                  "focus:ring-2",
                  "focus:ring-ring",
                )}
              >
                <ArrowLeft className="size-4" />
              </button>
            )}

            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder={getPlaceholder()}
              className={cn("h-14 text-[15px]", canGoBack && "pl-12")}
            />
          </div>

          {/* ================================================================ */}
          {/* CURRENT VIEW                                                      */}
          {/* ================================================================ */}

          {!isRoot && (
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <span className="truncate text-xs font-medium text-foreground">
                {getViewTitle()}
              </span>

              {view === "folder" && (
                <span className="text-xs text-muted-foreground">
                  {folderArticlesCount}{" "}
                  {folderArticlesCount === 1 ? "artykuł" : "artykułów"}
                </span>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* LIST                                                               */}
          {/* ================================================================ */}

          <CommandList className="max-h-[480px] px-2 pb-2">
            {/* ============================================================ */}
            {/* ROOT                                                           */}
            {/* ============================================================ */}

            {view === "root" && !normalizedQuery && (
              <>
                <CommandSeparator />

                <CommandGroup heading="Nawigacja">
                  <NavigationItem
                    icon={BookOpen}
                    label="Znajdź artykuł"
                    description="Wyszukaj artykuł w całej kolekcji"
                    onSelect={() => enterView("articles")}
                  />
                  <NavigationItem
                    icon={Folder}
                    label="Przejdź do folderu"
                    description="Przeglądaj strukturę kolekcji"
                    onSelect={() => enterView("folders")}
                  />

                  <NavigationItem
                    icon={Library}
                    label="Przełącz kolekcję"
                    description="Przejdź do innej kolekcji"
                    onSelect={() => enterView("workspaces")}
                  />
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Akcje">
                  {mockActions.map((action) => (
                    <ActionItem
                      key={action.id}
                      action={action}
                      onSelect={close}
                    />
                  ))}
                </CommandGroup>
              </>
            )}

            {/* ============================================================ */}
            {/* ROOT SEARCH                                                    */}
            {/* ============================================================ */}

            {view === "root" && normalizedQuery && (
              <>
                {filteredArticles.length > 0 && (
                  <CommandGroup heading="Artykuły">
                    {filteredArticles.map((article) => (
                      <ArticleItem
                        key={article.id}
                        article={article}
                        onSelect={handleOpenArticle}
                      />
                    ))}
                  </CommandGroup>
                )}

                {filteredFolders.length > 0 && (
                  <>
                    {filteredArticles.length > 0 && <CommandSeparator />}

                    <CommandGroup heading="Foldery">
                      {filteredFolders.map((folder) => (
                        <FolderItem
                          key={folder.id}
                          folder={folder}
                          onSelect={handleOpenFolder}
                        />
                      ))}
                    </CommandGroup>
                  </>
                )}

                {filteredWorkspaces.length > 0 && (
                  <>
                    {(filteredArticles.length > 0 ||
                      filteredFolders.length > 0) && <CommandSeparator />}

                    <CommandGroup heading="Kolekcje">
                      {filteredWorkspaces.map((workspace) => (
                        <WorkspaceItem
                          key={workspace.id}
                          workspace={workspace}
                          onSelect={handleSwitchWorkspace}
                        />
                      ))}
                    </CommandGroup>
                  </>
                )}

                {filteredActions.length > 0 && (
                  <>
                    {(filteredArticles.length > 0 ||
                      filteredFolders.length > 0 ||
                      filteredWorkspaces.length > 0) && <CommandSeparator />}

                    <CommandGroup heading="Akcje">
                      {filteredActions.map((action) => (
                        <ActionItem
                          key={action.id}
                          action={action}
                          onSelect={close}
                        />
                      ))}
                    </CommandGroup>
                  </>
                )}

                {!filteredArticles.length &&
                  !filteredFolders.length &&
                  !filteredWorkspaces.length &&
                  !filteredActions.length && (
                    <CommandEmpty className="py-12">
                      <EmptyState />
                    </CommandEmpty>
                  )}
              </>
            )}

            {/* ============================================================ */}
            {/* WORKSPACES                                                     */}
            {/* ============================================================ */}

            {view === "workspaces" && (
              <>
                {!filteredWorkspaces.length ? (
                  <CommandEmpty className="py-12">
                    <EmptyState label="Nie znaleziono kolekcji" />
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Kolekcje">
                    {filteredWorkspaces.map((workspace) => (
                      <WorkspaceItem
                        key={workspace.id}
                        workspace={workspace}
                        onSelect={handleSwitchWorkspace}
                      />
                    ))}
                  </CommandGroup>
                )}
              </>
            )}

            {/* ============================================================ */}
            {/* FOLDERS                                                        */}
            {/* ============================================================ */}

            {view === "folders" && (
              <>
                {!filteredFolders.length ? (
                  <CommandEmpty className="py-12">
                    <EmptyState label="Nie znaleziono folderów" />
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Foldery">
                    {filteredFolders.map((folder) => (
                      <FolderItem
                        key={folder.id}
                        folder={folder}
                        onSelect={handleOpenFolder}
                      />
                    ))}
                  </CommandGroup>
                )}
              </>
            )}

            {/* ============================================================ */}
            {/* FOLDER                                                          */}
            {/* ============================================================ */}

            {view === "folder" && (
              <>
                {!filteredArticles.length ? (
                  <CommandEmpty className="py-12">
                    <EmptyState label="Brak artykułów w tym folderze" />
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Artykuły">
                    {filteredArticles.map((article) => (
                      <ArticleItem
                        key={article.id}
                        article={article}
                        onSelect={handleOpenArticle}
                      />
                    ))}
                  </CommandGroup>
                )}
              </>
            )}

            {/* ============================================================ */}
            {/* ARTICLES                                                        */}
            {/* ============================================================ */}

            {view === "articles" && (
              <>
                {!filteredArticles.length ? (
                  <CommandEmpty className="py-12">
                    <EmptyState label="Nie znaleziono artykułów" />
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Artykuły">
                    {filteredArticles.map((article) => (
                      <ArticleItem
                        key={article.id}
                        article={article}
                        onSelect={handleOpenArticle}
                      />
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>

          {/* ================================================================ */}
          {/* FOOTER                                                            */}
          {/* ================================================================ */}

          <div className="flex h-10 items-center justify-between border-t bg-muted/30 px-4 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
                  ↑
                </kbd>
                <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
                  ↓
                </kbd>
                Nawiguj
              </span>

              <span className="flex items-center gap-1.5">
                <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
                  ↵
                </kbd>
                Otwórz
              </span>

              {canGoBack && (
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
                    ←
                  </kbd>
                  Wróć
                </span>
              )}
            </div>

            <span className="flex items-center gap-1.5">
              <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">
                Esc
              </kbd>
              Zamknij
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/* ========================================================================= */
/* Navigation Item                                                            */
/* ========================================================================= */

type NavigationItemProps = {
  icon: typeof BookOpen;
  label: string;
  description: string;
  onSelect: () => void;
};

function NavigationItem({
  icon: Icon,
  label,
  description,
  onSelect,
}: NavigationItemProps) {
  return (
    <CommandItem
      value={label}
      onSelect={onSelect}
      className="group gap-3 rounded-lg px-3 py-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium">{label}</span>

        <span className="text-xs text-muted-foreground">{description}</span>
      </div>

      <ChevronRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}

/* ========================================================================= */
/* Workspace Item                                                            */
/* ========================================================================= */

type WorkspaceItemProps = {
  workspace: MockWorkspace;
  onSelect: (workspaceId: string) => void;
};

function WorkspaceItem({ workspace, onSelect }: WorkspaceItemProps) {
  const Icon = workspace.icon;

  return (
    <CommandItem
      value={`${workspace.name} ${workspace.description}`}
      onSelect={() => onSelect(workspace.id)}
      className="group gap-3 rounded-lg px-3 py-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{workspace.name}</span>

        <span className="truncate text-xs text-muted-foreground">
          {workspace.description}
        </span>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}

/* ========================================================================= */
/* Folder Item                                                               */
/* ========================================================================= */

type FolderItemProps = {
  folder: MockFolder;
  onSelect: (folderId: string) => void;
};

function FolderItem({ folder, onSelect }: FolderItemProps) {
  return (
    <CommandItem
      value={`folder ${folder.name}`}
      onSelect={() => onSelect(folder.id)}
      className="group gap-3 rounded-lg px-3 py-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Folder className="size-4 text-muted-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{folder.name}</span>

        <span className="text-xs text-muted-foreground">
          {folder.articlesCount}{" "}
          {folder.articlesCount === 1 ? "artykuł" : "artykułów"}
        </span>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}

/* ========================================================================= */
/* Action Item                                                               */
/* ========================================================================= */

type ActionItemProps = {
  action: MockAction;
  onSelect: () => void;
};

function ActionItem({ action, onSelect }: ActionItemProps) {
  const Icon = action.icon;

  return (
    <CommandItem
      value={`akcja ${action.label}`}
      onSelect={onSelect}
      className="group gap-3 rounded-lg px-3 py-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium">{action.label}</span>

        <span className="truncate text-xs text-muted-foreground">
          {action.description}
        </span>
      </div>
    </CommandItem>
  );
}

/* ========================================================================= */
/* Article Item                                                              */
/* ========================================================================= */

type ArticleItemProps = {
  article: MockArticle;
  onSelect: (articleId: string) => void;
};

function ArticleItem({ article, onSelect }: ArticleItemProps) {
  return (
    <CommandItem
      value={[article.title, article.folderName, ...article.tags].join(" ")}
      onSelect={() => onSelect(article.id)}
      className="group gap-3 rounded-lg px-3 py-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <FileText className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{article.title}</div>

        <div className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
          <span className="truncate">{article.folderName}</span>

          <ChevronRight className="size-3 shrink-0" />

          <span className="truncate">
            {article.tags.slice(0, 2).join(" · ")}
          </span>
        </div>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}

/* ========================================================================= */
/* Empty State                                                               */
/* ========================================================================= */

type EmptyStateProps = {
  label?: string;
};

function EmptyState({ label = "Nie znaleziono wyników" }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
        <Search className="size-4 text-muted-foreground" />
      </div>

      <p className="text-sm font-medium">{label}</p>

      <p className="mt-1 text-xs text-muted-foreground">
        Spróbuj użyć innej nazwy lub frazy.
      </p>
    </div>
  );
}
