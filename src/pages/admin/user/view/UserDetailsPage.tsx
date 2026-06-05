import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MoreVertical,
  RefreshCcw,
  UserCog,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { roleIconMap } from "../../../../constants/role-icons";
import { useFindUserWithDetailsQuery } from "../../../../hooks/admin/use-admin";

interface Props {
  openPasswordReset: (user) => void;
  openEditRole: (user) => void;
}

export const UserDetailsPage = ({ openPasswordReset, openEditRole }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: user } = useFindUserWithDetailsQuery(id!);

  if (!user) {
    return null;
  }

  const RoleIcon = roleIconMap[user.role.iconKey as keyof typeof roleIconMap];

  return (
    <div className="space-y-8">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Powrót
      </button>

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted font-semibold">
            {user.name[0]}
            {user.surname[0]}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {user.name} {user.surname}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} />
              {user.email}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg border p-2 hover:bg-muted/40">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => openPasswordReset(user)}
              className="flex items-center gap-2"
            >
              <RefreshCcw size={14} />
              Zresetuj hasło
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                openEditRole(user);
              }}
              className="flex items-center gap-2"
            >
              <UserCog size={14} />
              Zmień role
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2">
              <UserCog size={14} />
              Wymuś onboarding
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-red-500">
              {user.isActive ? (
                <>
                  <XCircle size={14} />
                  Wyłącz konto
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  Włącz konto
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* STATUS */}
      <Section title="Status konta">
        <Row
          label="Stan konta"
          value={<StatusBadge active={user.isActive} />}
        />

        <Divider />

        <Row
          label="Wymagana zmiana hasła"
          value={user.mustChangePassword ? "Tak" : "Nie"}
        />
      </Section>

      {/* ACCOUNT */}
      <Section title="Dane konta">
        <Row label="Imię" value={user.name} />

        <Divider />

        <Row label="Nazwisko" value={user.surname} />

        <Divider />

        <Row label="Adres e-mail" value={user.email} />
      </Section>

      {/* ROLE */}
      <Section title="Rola systemowa">
        <Row
          label="Rola"
          value={
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${user.role.labelColor}20`,
                  color: user.role.labelColor,
                }}
              >
                {RoleIcon ? <RoleIcon size={16} /> : null}
              </div>

              <span className="font-medium">{user.role.name}</span>
            </div>
          }
        />
      </Section>

      {/* ACTIVITY */}
      <Section title="Aktywność">
        <Row
          label="Ostatnie logowanie"
          value={
            user.lastLogin
              ? format(new Date(user.lastLogin), "d MMMM yyyy, HH:mm", {
                  locale: pl,
                })
              : "Brak logowań"
          }
        />

        <Divider />

        <Row
          label="Data utworzenia konta"
          value={format(new Date(user.createdAt), "d MMMM yyyy, HH:mm", {
            locale: pl,
          })}
        />
      </Section>
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
  <div className="overflow-hidden rounded-xl border bg-card">
    <div className="border-b bg-muted/20 px-5 py-3 text-sm font-medium">
      {title}
    </div>

    <div className="px-5 py-2">{children}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-6 py-3">
    <span className="text-sm text-muted-foreground">{label}</span>

    <div className="text-sm">{value}</div>
  </div>
);

const Divider = () => <div className="h-px bg-border" />;

const StatusBadge = ({ active }: { active: boolean }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs ${
      active
        ? "border-green-500/20 bg-green-500/10 text-green-600"
        : "border-red-500/20 bg-red-500/10 text-red-600"
    }`}
  >
    {active ? (
      <>
        <CheckCircle2 size={12} />
        Aktywne
      </>
    ) : (
      <>
        <XCircle size={12} />
        Wyłączone
      </>
    )}
  </div>
);
