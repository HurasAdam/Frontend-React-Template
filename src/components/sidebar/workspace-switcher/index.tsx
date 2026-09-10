import { BookOpen, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { workspaceIconMap } from "../../../constants/workspace-icons";
import type { IWorkspaceInfo } from "../../../pages/app/workspace/subpages/settings/view/Settings";

type WorkspaceSwitcherProps = {
  workspace: IWorkspaceInfo;
  onClose?: () => void;
};

type MockWorkspace = {
  id: string;
  name: string;
  iconKey: string;
  labelColor: string;
};

const mockWorkspaces: MockWorkspace[] = [
  {
    id: "workspace-1",
    name: "Baza wiedzy",
    iconKey: "book-open",
    labelColor: "#6366f1",
  },
  {
    id: "workspace-2",
    name: "Pomoc techniczna",
    iconKey: "headphones",
    labelColor: "#0ea5e9",
  },
  {
    id: "workspace-3",
    name: "Dokumentacja IT",
    iconKey: "server",
    labelColor: "#10b981",
  },
  {
    id: "workspace-4",
    name: "Procedury szkolne",
    iconKey: "graduation-cap",
    labelColor: "#f59e0b",
  },
  {
    id: "workspace-5",
    name: "Projekty",
    iconKey: "folder-kanban",
    labelColor: "#ec4899",
  },
];

export function WorkspaceSwitcher({
  workspace,
  onClose,
}: WorkspaceSwitcherProps) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const activeWorkspace = mockWorkspaces.find(
    (item) => item.id === workspace.id,
  ) ?? {
    id: workspace.id,
    name: workspace.name,
    iconKey: workspace.iconKey,
    labelColor: workspace.labelColor,
  };

  const WorkspaceIcon = workspaceIconMap[activeWorkspace.iconKey] ?? BookOpen;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

      if (!isShortcut) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setOpen((current) => !current);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const handleSelect = (workspaceId: string) => {
    setOpen(false);
    navigate(`/workspace/${workspaceId}`);
    onClose?.();
  };

  const handleCreateWorkspace = () => {
    setOpen(false);

    // TODO: przejście do tworzenia kolekcji
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg p-2",
            "text-left outline-none transition-colors",
            "hover:bg-accent",
            "focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
            style={{
              backgroundColor: activeWorkspace.labelColor,
            }}
          >
            <WorkspaceIcon className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {activeWorkspace.name}
            </p>

            <p className="text-xs text-muted-foreground">kolekcja</p>
          </div>

          <ChevronsUpDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground",
              "transition-colors group-hover:text-foreground",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={6}
        className="w-[248px] p-0"
      >
        <Command>
          <CommandInput placeholder="Szukaj kolekcji..." />

          <CommandList>
            <CommandEmpty>Nie znaleziono kolekcji.</CommandEmpty>

            <CommandGroup heading="Twoje kolekcje">
              {mockWorkspaces.map((item) => {
                const Icon = workspaceIconMap[item.iconKey] ?? BookOpen;

                const isActive = item.id === activeWorkspace.id;

                return (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(item.id)}
                    className="gap-3"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-primary-foreground"
                      style={{
                        backgroundColor: item.labelColor,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <span className="min-w-0 flex-1 truncate">{item.name}</span>

                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              <CommandItem
                onSelect={handleCreateWorkspace}
                className="gap-3 text-muted-foreground"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-border">
                  <Plus className="h-3.5 w-3.5" />
                </div>

                <span>Utwórz kolekcję</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
