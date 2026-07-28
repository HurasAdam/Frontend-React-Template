import { workspaceIconOptions } from "../../../../../../constants/workspace-icons";
import type { EditModalType } from "../hooks/useEditModal";
import { Card } from "../shared/Card";
import { Divider } from "../shared/Divider";
import EmptyValue from "../shared/EmptyValue";
import { Section } from "../shared/Section";
import { SettingRow } from "../shared/SettingRow";
import type { IWorkspaceInfo } from "../view/Settings";

interface Props {
  workspace: IWorkspaceInfo;
  onEdit: (type: Exclude<EditModalType, null>) => void;
}

export default function BasicSettings({ workspace, onEdit }: Props) {
  const icon = workspaceIconOptions.find(
    (item) => item.name === workspace.iconKey,
  );

  const Icon = icon?.icon;

  return (
    <Section title="Podstawowe informacje">
      <Card>
        <SettingRow
          title="Nazwa kolekcji"
          description="Nazwa widoczna dla użytkowników"
          value={workspace.name}
          onEdit={() => onEdit("name")}
        />

        <Divider />

        <SettingRow
          title="Opis kolekcji"
          description="Krótki opis przeznaczenia kolekcji"
          value={workspace.description ? workspace.description : <EmptyValue />}
          onEdit={() => onEdit("description")}
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
          onEdit={() => onEdit("labelColor")}
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
          onEdit={() => onEdit("iconKey")}
        />
      </Card>
    </Section>
  );
}
