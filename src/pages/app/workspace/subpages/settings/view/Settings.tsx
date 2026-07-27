import { Pencil, SettingsIcon } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Button } from "../../../../../../components/ui/button";
import { workspaceIconOptions } from "../../../../../../constants/workspace-icons";
import { useEditModal } from "../hooks/useEditModal";
import { WorkspaceEditModal } from "../modals/WorkspaceEditModal";

export interface IWorkspaceInfo {
  id: string;
  name: string;
  description: string;
  labelColor: string;
  iconKey: string;
}

type WorkspaceContext = {
  workspace: IWorkspaceInfo;
};

export const Settings = () => {
  const { workspace } = useOutletContext<WorkspaceContext>();

  const icon = workspaceIconOptions.find(
    (item) => item.name === workspace.iconKey,
  );

  const Icon = icon?.icon;

  const handleEdit = (field: string) => {
    console.log("EDIT:", field);
  };
  const editModal = useEditModal();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-10 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <SettingsIcon size={18} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Ustawienia kolekcji</h1>

          <p className="text-sm text-muted-foreground">
            Zarządzaj nazwą, wyglądem oraz informacjami kolekcji
          </p>
        </div>
      </div>

      <Section title="Podstawowe informacje">
        <Card>
          <SettingRow
            title="Nazwa kolekcji"
            description="Nazwa widoczna dla użytkowników"
            value={workspace.name}
            onEdit={() => editModal.open("name")}
          />

          <Divider />

          <SettingRow
            title="Opis kolekcji"
            description="Krótki opis przeznaczenia kolekcji"
            value={
              workspace.description ? workspace.description : <EmptyValue />
            }
            onEdit={() => editModal.open("description")}
          />

          <Divider />

          <SettingRow
            title="Kolor etykiety"
            description="Kolor identyfikujący kolekcję"
            value={
              <div className="flex items-center gap-3">
                <span
                  className="
                    w-8 h-8
                    rounded-md
                    border
                  "
                  style={{
                    backgroundColor: workspace.labelColor,
                  }}
                />

                <span className="text-sm">{workspace.labelColor}</span>
              </div>
            }
            onEdit={() => editModal.open("labelColor")}
          />

          <Divider />

          <SettingRow
            title="Ikona kolekcji"
            description="Ikona reprezentująca kolekcję"
            value={
              Icon ? (
                <div
                  className="
                  flex items-center gap-3
                "
                >
                  <div
                    className="
                    w-9.5 h-9.5
                    rounded-md
                    border
                    flex items-center justify-center
                    bg-muted/30
                  "
                  >
                    <Icon size={20} />
                  </div>
                </div>
              ) : (
                <EmptyValue />
              )
            }
            onEdit={() => editModal.open("iconKey")}
          />
        </Card>
      </Section>

      <Section title="Niebezpieczne akcje">
        <Card>
          <SettingRow
            title="Usuń kolekcję"
            description="Trwale usuwa kolekcję oraz wszystkie dane"
            value={
              <span
                className="
                text-sm
                text-muted-foreground
              "
              >
                Ta operacja jest nieodwracalna
              </span>
            }
            onEdit={() => handleEdit("delete")}
          />
        </Card>
      </Section>

      <WorkspaceEditModal
        type={editModal.type}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        workspace={workspace}
      />
    </div>
  );
};

/* ================= UI ================= */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-10">
    <h2
      className="
      text-xs
      uppercase
      tracking-wide
      text-muted-foreground
      mb-3
    "
    >
      {title}
    </h2>

    {children}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    className="
    rounded-xl
    border
    bg-card
    overflow-hidden
    shadow-sm
  "
  >
    {children}
  </div>
);

const SettingRow = ({
  title,
  description,
  value,
  onEdit,
}: {
  title: string;
  description: string;
  value: React.ReactNode;
  onEdit: () => void;
}) => (
  <div
    className="
    px-6
    py-5
  "
  >
    <div>
      <p className="text-sm font-medium">{title}</p>

      <p
        className="
        text-xs
        text-muted-foreground
        mt-1
      "
      >
        {description}
      </p>
    </div>

    <div
      className="
      mt-4
      flex
      items-center
      justify-between
      gap-5
    "
    >
      <div
        className="
        text-sm
        max-w-[650px]
        break-words
      "
      >
        {value}
      </div>

      <Button size="sm" variant="outline" onClick={onEdit}>
        <Pencil size={14} />
        Edytuj
      </Button>
    </div>
  </div>
);

const Divider = () => <div className="h-px bg-border mx-6" />;

const EmptyValue = () => (
  <span
    className="
    text-sm
    text-muted-foreground
    italic
  "
  >
    Brak wartości
  </span>
);
