import { Check, PlusIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { workspaceIconOptions } from "../../../../constants/workspace-icons";
import { useFindWorkspaceCandidatesQuery } from "../../../../hooks/users/queries/use-users.queries";
import { useAddWorkspaceMutation } from "../../../../hooks/workspaces/mutations/use-workspace.mutations";

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

  "#0F766E", // teal (ciemny morski)
  "#8B5CF6", // lavender (jaśniejszy fiolet)
  "#C2410C", // burnt orange (ceglasty pomarańcz)
  "#9F1239", // burgundy
];

export const NewWorkspacePage = ({ onClose }) => {
  const toggleMember = (id: string) => {
    const current = form.getValues("members");

    form.setValue(
      "members",
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  };

  type CreateWorkspaceForm = {
    name: string;
    description: string;
    labelColor: string;
    iconKey: string;
    members: string[];
  };
  const form = useForm<CreateWorkspaceForm>({
    defaultValues: {
      name: "",
      description: "",
      labelColor: "#3b82f6",
      iconKey: "Shield",
      members: [],
    },
  });

  const { data: usersList } = useFindWorkspaceCandidatesQuery();

  useEffect(() => {
    if (usersList) {
      form.reset({
        ...form.getValues(),
        members: usersList.map((user) => user.id),
      });
    }
  }, [usersList]);

  const { mutate } = useAddWorkspaceMutation();

  const onSubmit = (data: CreateWorkspaceForm) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        toast.success("Utworzono workspace");
      },
    });
  };

  const canCreate = useMemo(() => name.trim().length > 2, [name]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-screen bg-background"
    >
      <div className="mx-auto w-full">
        {/* HEADER */}
        <div className="mb-10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <PlusIcon size={18} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Nowa kolekcja</h1>
            <p className="text-sm text-muted-foreground">
              Określ uprawnienia i poziom dostępu w systemie
            </p>
          </div>
        </div>

        {/* BASIC */}
        <Section title="Podstawowe informacje">
          <Card>
            <Row
              title="Nazwa kolekcji"
              description="Unikalna nazwa używana w systemie"
              right={
                <Input
                  {...form.register("name")}
                  placeholder="Np. Pisma"
                  className="w-[330px]"
                />
              }
            />

            <Divider />

            <Row
              title="Kolor etykiety"
              description="Wybierz kolor"
              right={
                <div className="grid grid-cols-8 gap-2 w-[330px]">
                  {colorOptions.map((c) => {
                    const active = form.watch("labelColor") === c;

                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => form.setValue("labelColor", c)}
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
                <div className="grid grid-cols-8 gap-2 w-[330px]">
                  {workspaceIconOptions.map(({ name, icon: Icon }) => {
                    const active = form.watch("iconKey") === name;

                    return (
                      <button
                        type="button"
                        key={name}
                        onClick={() => form.setValue("iconKey", name)}
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
            <Divider />
            <div className="flex px-6 py-4">
              <div className="w-[70%] pr-6">
                <p className="text-sm font-medium">Opis</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Dodaj krótki opis(opcjonalne)
                </p>
              </div>

              <div className="w-[33%] flex justify-end">
                <Textarea
                  {...form.register("description")}
                  placeholder="krótki opis..."
                  className="w-full min-h-28 resize-none"
                />
              </div>
            </div>
          </Card>
        </Section>

        {/* MEMBERS */}
        <Section title="Członkowie kolekcji">
          <Card>
            <div className="px-6 py-4 border-b bg-muted/30">
              <p className="text-sm font-medium">Dodaj użytkowników</p>

              <p className="text-xs text-muted-foreground mt-1">
                Wybierz osoby, które będą miały dostęp do kolekcji
              </p>
            </div>

            {usersList?.map((user) => (
              <div
                key={user.id}
                className="
      flex items-center justify-between
      px-6 py-4
      border-b last:border-none
    "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
          w-9 h-9 rounded-full
          bg-primary/10 text-primary
          flex items-center justify-center
          text-sm font-medium
        "
                  >
                    {user.name[0].toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {user.name} {user.surname}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleMember(user.id)}
                  className={`
    w-7 h-7 rounded-md border
    flex items-center justify-center
    transition
    ${
      form.watch("members").includes(user.id)
        ? "bg-primary/10 border-primary text-primary"
        : "hover:bg-muted"
    }
  `}
                >
                  {form.watch("members").includes(user.id) && (
                    <Check size={14} />
                  )}
                </button>
              </div>
            ))}
          </Card>
        </Section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-10">
          <Button variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button type="submit">Utwórz rolę</Button>
        </div>
      </div>
    </form>
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
    <div className="w-[60%]  pr-6">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>

    <div className="w-[40%] flex justify-end">{right}</div>
  </div>
);

const Divider = () => <div className="h-px bg-border mx-6" />;
