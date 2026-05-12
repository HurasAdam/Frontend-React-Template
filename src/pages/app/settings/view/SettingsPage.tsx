import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { SettingsIcon } from "lucide-react";
import { ModeToggle } from "../../../../components/theme/ModeToggle";
import { SettingsCard } from "../components/SettingsCard";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsSection } from "../components/SettingsSection";

export const SettingsPage = () => {
  const user = {
    name: "Jan Kowalski",
    email: "jan@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100",
    createdAt: new Date("2026-05-12"),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[900px] ">
        <h1 className="text-2xl flex items-center gap-2 font-semibold mb-10">
          <SettingsIcon
            size={24}
            className="text-muted-foreground"
            aria-hidden
          />
          <span>Ustawienia</span>
        </h1>

        {/* USER */}
        <SettingsSection title="Konto">
          <SettingsCard>
            <div className="flex items-center gap-4 px-6 py-6">
              <img src={user.avatar} className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <SettingsDivider />

            <SettingsRow
              title="Rola"
              description="Twoja rola w systemie"
              right={<SettingsBadge label={user.role} />}
            />

            <SettingsDivider />

            <SettingsRow
              title="Data utworzenia konta"
              description="Kiedy konto zostało założone"
              right={
                <span className="text-xs text-muted-foreground">
                  {format(user.createdAt, "d MMMM yyyy", {
                    locale: pl,
                  })}
                </span>
              }
            />
          </SettingsCard>
        </SettingsSection>

        {/* PREFERENCES */}
        <SettingsSection title="Preferencje">
          <SettingsCard>
            <SettingsRow
              title="Efekty dźwiękowe"
              description="Włącz lub wyłącz dźwięki w aplikacji"
              right={<SettingToggle />}
            />
          </SettingsCard>
        </SettingsSection>

        {/* APPEARANCE */}
        <SettingsSection title="Wygląd">
          <SettingsCard>
            <SettingsRow
              title="Motyw aplikacji"
              description="Zmień tryb jasny / ciemny"
              right={<ModeToggle />}
            />
          </SettingsCard>
        </SettingsSection>
      </div>
    </div>
  );
};

/* ================= UI ================= */

const SettingsDivider = () => <div className="h-px bg-border mx-6" />;

const SettingToggle = () => (
  <button className="w-10 h-6 rounded-full bg-primary relative">
    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition" />
  </button>
);

const SettingsThemeSelect = () => (
  <select className="text-xs px-3 py-1.5 rounded-md border bg-muted">
    <option>Light</option>
    <option>Dark</option>
    <option>System</option>
  </select>
);

const SettingsBadge = ({ label }: { label: string }) => (
  <span className="text-xs px-2 py-1 rounded-md border bg-muted">{label}</span>
);
