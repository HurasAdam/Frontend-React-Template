import type { AxiosError } from "axios";
import {
  Check,
  ChefHat,
  ChessKnight,
  CreativeCommons,
  Eye,
  FileText,
  HandFist,
  HandHelping,
  PencilRuler,
  PenTool,
  Rose,
  Shield,
  TreePalm,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import queryClient from "../../../../config/query.config";

import {
  useCreateRoleMutation,
  useGetPermissionsQuery,
} from "../../../../hooks/roles/use-roles";

type PermissionDTO = {
  key: string;
  label: string;
  category: string;
  description: string;
};

export const colorOptions = [
  "#4F46E5", // indigo (core system)
  "#1D4ED8", // deep blue (strong, distinct from indigo)

  "#06B6D4", // cyan (cool accent, separated hue family)

  "#10B981", // emerald (primary green - calm, premium)
  "#16A34A", // green (darker, clearly distinct from emerald)
  "#84CC16", // lime (warm green accent, different direction)

  "#F59E0B", // amber (premium warning/warm)
  "#F97316", // orange (strong warm accent)

  "#EF4444", // red (error / critical)
  "#E11D48", // rose-red (warmer red family, not identical)

  "#A855F7", // purple (creative/admin)
  "#7C3AED", // deep violet (distinct purple variant)
];

export const iconOptions = [
  { key: "User", Icon: User },
  { key: "PencilRuler", Icon: PencilRuler },

  { key: "CreativeCommons", Icon: CreativeCommons },
  { key: "ChessKnight", Icon: ChessKnight },
  { key: "TreePalm", Icon: TreePalm },
  { key: "HandFist", Icon: HandFist },
  { key: "Eye", Icon: Eye },
  { key: "PenTool", Icon: PenTool },
  { key: "FileText", Icon: FileText },
  { key: "Rose", Icon: Rose },
  { key: "HandHelping", Icon: HandHelping },
  { key: "ChefHat", Icon: ChefHat },
];

export const AddRolePage = ({ onClose }) => {
  const [name, setName] = useState("");
  const [labelColor, setLabelColor] = useState("#3b82f6");
  const [icon, setIcon] = useState("Shield");
  const [permissions, setPermissions] = useState<string[]>([]);

  const { data: permissionsList = [] } = useGetPermissionsQuery();
  const { mutate } = useCreateRoleMutation();

  const onsubmit = () => {
    const payload = { name, labelColor, icon, permissions };

    mutate(payload, {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["roles"] });

        toast.success("Dodano rolę", {
          position: "bottom-right",
        });
      },
      onError: (error) => {
        const { status } = error as AxiosError;

        if (status === 403) {
          toast.error("Brak uprawnień", {
            description:
              "Nie posiadasz wymaganych uprawnień do wykonania tej operacji.",
            position: "bottom-right",
          });
          return;
        }

        if (status === 409) {
          toast.error("Rola już istnieje", {
            description: "Nazwa roli musi być unikalna.",
            position: "bottom-right",
          });
          return;
        }

        toast.error("Błąd serwera", {
          position: "bottom-right",
        });
      },
    });
  };

  const groupedPermissions = useMemo(() => {
    return permissionsList.reduce(
      (acc: Record<string, PermissionDTO[]>, perm: PermissionDTO) => {
        if (!acc[perm.category]) acc[perm.category] = [];
        acc[perm.category].push(perm);
        return acc;
      },
      {},
    );
  }, [permissionsList]);

  const toggle = (key: string) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const toggleGroup = (perms: PermissionDTO[]) => {
    const allSelected = perms.every((p) => permissions.includes(p.key));

    setPermissions((prev) => {
      if (allSelected) {
        return prev.filter((p) => !perms.some((x) => x.key === p));
      }
      return Array.from(new Set([...prev, ...perms.map((p) => p.key)]));
    });
  };

  const canCreate = useMemo(() => name.trim().length > 2, [name]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full">
        {/* HEADER */}
        <div className="mb-10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Shield size={18} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Tworzenie roli</h1>
            <p className="text-sm text-muted-foreground">
              Określ uprawnienia i poziom dostępu w systemie
            </p>
          </div>
        </div>

        {/* BASIC */}
        <Section title="Podstawowe informacje">
          <Card>
            <Row
              title="Nazwa roli"
              description="Unikalna nazwa używana w systemie"
              right={
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Np. Kontrybutor"
                  className="w-[240px]"
                />
              }
            />

            <Divider />

            <Row
              title="Kolor etykiety"
              description="Wybierz kolor"
              right={
                <div className="grid grid-cols-6 gap-2 w-[240px]">
                  {colorOptions.map((c) => {
                    const active = labelColor === c;

                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setLabelColor(c)}
                        className={`
              w-7.5 h-7.5 rounded-md border flex items-center justify-center
              transition
              ${
                active
                  ? "ring-2 ring-primary border-primary scale-105"
                  : "hover:scale-105"
              }
            `}
                        style={{ backgroundColor: c }}
                      >
                        {active && (
                          <Check size={12} className="text-white drop-shadow" />
                        )}
                      </button>
                    );
                  })}
                </div>
              }
            />

            <Divider />

            {/* ICON */}
            <Row
              title="Ikona"
              description="Wybierz ikonę"
              right={
                <div className="grid grid-cols-6 gap-2 w-[240px]">
                  {iconOptions.map(({ key, Icon }) => {
                    const active = icon === key;

                    return (
                      <button
                        key={key}
                        onClick={() => setIcon(key)}
                        className={`
                          w-9 h-9 rounded-md border flex items-center justify-center
                          transition
                          ${
                            active
                              ? "bg-primary/10 border-primary text-primary"
                              : "hover:bg-muted"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              }
            />
          </Card>
        </Section>

        {/* PERMISSIONS */}
        <Section title="Uprawnienia">
          <Card>
            {Object.entries(groupedPermissions).map(([group, perms]) => {
              const selected = perms.filter((p) =>
                permissions.includes(p.key),
              ).length;

              const allSelected = selected === perms.length;

              return (
                <div key={group}>
                  <div className="px-6 py-4 flex items-center justify-between border-b bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{group}</p>
                      <p className="text-xs text-muted-foreground">
                        wybrane: {selected}/{perms.length}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleGroup(perms)}
                      className={`
                        text-xs px-3 py-1.5 rounded-md border transition
                        ${
                          allSelected
                            ? "bg-primary/10 border-primary text-primary"
                            : "hover:bg-muted"
                        }
                      `}
                    >
                      {allSelected ? "Odznacz wszystkie" : "Zaznacz wszystkie"}
                    </button>
                  </div>

                  {perms.map((perm) => {
                    const active = permissions.includes(perm.key);

                    return (
                      <Row
                        key={perm.key}
                        title={perm.label}
                        description={perm.description}
                        right={
                          <button
                            onClick={() => toggle(perm.key)}
                            className={`
                              w-7 h-7 rounded-md border flex items-center justify-center
                              ${
                                active
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "hover:bg-muted"
                              }
                            `}
                          >
                            {active && <Check size={14} />}
                          </button>
                        }
                      />
                    );
                  })}

                  <Divider />
                </div>
              );
            })}
          </Card>
        </Section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-10">
          <Button variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button onClick={onsubmit} disabled={!canCreate}>
            Utwórz rolę
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ================= UI ================= */

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
      {title}
    </h2>
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
    {children}
  </div>
);

const Row = ({ title, description, right }) => (
  <div className="flex items-center px-6 py-4">
    <div className="w-[60%] pr-6">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>

    <div className="w-[40%] flex justify-end">{right}</div>
  </div>
);

const Divider = () => <div className="h-px bg-border mx-6" />;
