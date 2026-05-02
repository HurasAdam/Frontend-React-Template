import {
  CheckCircle2,
  Mail,
  Plus,
  Search,
  Shield,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type UserRole = "ADMIN" | "USER";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatar: string;
};

// --- MOCK ---
const MOCK_USERS: AppUser[] = [
  {
    id: "1",
    name: "Jan Kowalski",
    email: "jan@example.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Anna Nowak",
    email: "anna@example.com",
    role: "USER",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Piotr Zieliński",
    email: "piotr@example.com",
    role: "USER",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Katarzyna Wiśniewska",
    email: "kasia@example.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Tomasz Lewandowski",
    email: "tomasz@example.com",
    role: "USER",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "6",
    name: "Michał Wójcik",
    email: "michal@example.com",
    role: "USER",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: "7",
    name: "Agnieszka Kamińska",
    email: "aga@example.com",
    role: "USER",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "8",
    name: "Paweł Dąbrowski",
    email: "pawel@example.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "9",
    name: "Karolina Mazur",
    email: "karolina@example.com",
    role: "USER",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "10",
    name: "Mateusz Kaczmarek",
    email: "mateusz@example.com",
    role: "USER",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

const ROLES = ["Wszystkie", "ADMIN", "USER"];
const STATUS = ["Wszystkie", "Aktywne", "Wyłączone"];

export const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Wszystkie");
  const [status, setStatus] = useState("Wszystkie");

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "Wszystkie" || u.role === role;

      const matchesStatus =
        status === "Wszystkie" ||
        (status === "Aktywne" && u.isActive) ||
        (status === "Wyłączone" && !u.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Użytkownicy</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj kontami użytkowników systemu
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus size={16} />
          Dodaj użytkownika
        </button>
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
              className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
            />
          </div>

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background text-sm"
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background text-sm"
          >
            {STATUS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border bg-card p-5 hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              {/* AVATAR */}
              <img
                src={user.avatar}
                className="w-12 h-12 rounded-xl object-cover"
              />

              {/* INFO */}
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.name}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Mail size={12} />
                  {user.email}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {/* ROLE */}
                  <span className="text-xs px-2 py-1 rounded-md bg-muted flex items-center gap-1">
                    <Shield size={12} />
                    {user.role}
                  </span>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${
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
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            Brak użytkowników
          </div>
        )}
      </div>
    </div>
  );
};
