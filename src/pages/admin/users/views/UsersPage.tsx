import {
  CheckCircle2,
  Mail,
  Plus,
  Search,
  Shield,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFindUsersWithDetailsQuery } from "../../../../hooks/users/queries/use-users.queries";

type UserDetails = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: {
    id: string;
    name: string;
    iconKey: string;
  } | null;
  isActive: boolean;
};

const STATUS = ["Wszystkie", "Aktywne", "Wyłączone"];

export const UsersPage = ({ openAdd }) => {
  const { data = [], isLoading } = useFindUsersWithDetailsQuery();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Wszystkie");
  const [status, setStatus] = useState("Wszystkie");

  const roles = useMemo(() => {
    const roleNames = Array.from(
      new Set(data.map((user) => user.role?.name).filter(Boolean)),
    );

    return ["Wszystkie", ...roleNames];
  }, [data]);

  const filtered = useMemo(() => {
    return (data as UserDetails[]).filter((user) => {
      const fullName = `${user.name} ${user.surname}`;

      const matchesSearch =
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "Wszystkie" || user.role?.name === role;

      const matchesStatus =
        status === "Wszystkie" ||
        (status === "Aktywne" && user.isActive) ||
        (status === "Wyłączone" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [data, search, role, status]);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Użytkownicy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Zarządzaj kontami użytkowników systemu
          </p>
        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          onClick={openAdd}
        >
          <Plus size={16} />
          Dodaj użytkownika
        </button>
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {/* SEARCH */}
          <div className="relative md:col-span-2">
            <Search
              size={16}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj użytkownika..."
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm"
            />
          </div>

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            {roles.map((roleName) => (
              <option key={roleName}>{roleName}</option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            {STATUS.map((statusName) => (
              <option key={statusName}>{statusName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LIST */}
      {isLoading ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          Ładowanie użytkowników...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((user) => (
            <Link
              to={`/admin/users/${user.id}`}
              key={user.id}
              className="rounded-2xl border bg-card p-5 transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* AVATAR PLACEHOLDER */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-sm font-semibold">
                  {user.name.charAt(0)}
                  {user.surname.charAt(0)}
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {user.name} {user.surname}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail size={12} />
                    {user.email}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {/* ROLE */}
                    <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                      <Shield size={12} />
                      {user.role?.name ?? "Brak roli"}
                    </span>

                    {/* STATUS */}
                    <span
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                        user.isActive
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {user.isActive ? (
                        <>
                          <CheckCircle2 size={12} />
                          Aktywny
                        </>
                      ) : (
                        <>
                          <XCircle size={12} />
                          Wyłączony
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center text-sm text-muted-foreground">
              Brak użytkowników
            </div>
          )}
        </div>
      )}
    </div>
  );
};
