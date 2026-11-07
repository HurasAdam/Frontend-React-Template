import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { LockKeyhole, SettingsIcon } from "lucide-react";

import { ModeToggle } from "../../../../components/theme/ModeToggle";
import { SettingsCard } from "../components/SettingsCard";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsSection } from "../components/SettingsSection";

import { Button } from "@/components/ui/button";
import SettingsModalsSection from "../components/SettingsModalsSection";
import { useSettingsModal } from "../hooks/useSettingsModal";

export const SettingsPage = () => {
  const settingsModal = useSettingsModal();

  const user = {
    name: "Jan Kowalski",
    email: "jan@example.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100",
    createdAt: new Date("2026-05-12"),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[900px]">
        <h1 className="mb-10 flex items-center gap-2 text-2xl font-semibold">
          <SettingsIcon
            size={24}
            className="text-muted-foreground"
            aria-hidden
          />
          <span>Ustawienia</span>
        </h1>

        {/* ACCOUNT */}
        <SettingsSection title="Konto">
          <SettingsCard>
            <div className="flex items-center gap-4 px-6 py-6">
              <img
                src={user.avatar}
                alt=""
                className="h-12 w-12 rounded-full"
              />

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

            <SettingsDivider />

            <SettingsRow
              title="Hasło"
              description="Zaktualizuj hasło do swojego konta"
              right={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={settingsModal.openChangePassword}
                  className="rounded-lg"
                >
                  <LockKeyhole className="mr-2 size-4" />
                  Zmień hasło
                </Button>
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

      <SettingsModalsSection
        isOpen={settingsModal.isOpen}
        onClose={settingsModal.close}
        type={settingsModal.type}
      />
    </div>
  );
};

/* ================= CHANGE PASSWORD DIALOG ================= */

/* ================= UI ================= */

const SettingsDivider = () => <div className="mx-6 h-px bg-border" />;

const SettingToggle = () => (
  <button className="relative h-6 w-10 rounded-full bg-primary">
    <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition" />
  </button>
);

const SettingsBadge = ({ label }: { label: string }) => (
  <span className="rounded-md border bg-muted px-2 py-1 text-xs">{label}</span>
);
