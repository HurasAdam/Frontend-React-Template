import {
  CheckCircle2,
  Crown,
  Mail,
  Plus,
  Search,
  Shield,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  isActive: boolean;
  avatar: string;
  lastLogin: string;
};

// --- MOCK ---
const MOCK_ADMINS: Admin[] = [
  {
    id: "1",
    name: "Andrzej Kowalczyk",
    email: "adam@system.com",
    role: "SUPER_ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=11",
    lastLogin: "2h temu",
  },
  {
    id: "2",
    name: "Dariusz Miller",
    email: "anna@system.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=12",
    lastLogin: "1 dzień temu",
  },
  {
    id: "3",
    name: "Michał Nowak",
    email: "michal@system.com",
    role: "ADMIN",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=13",
    lastLogin: "7 dni temu",
  },
  {
    id: "4",
    name: "Tomasz Lewandowski",
    email: "kasia@system.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=14",
    lastLogin: "5h temu",
  },
  {
    id: "5",
    name: "Kasia Wiśniewska",
    email: "tomasz@system.com",
    role: "ADMIN",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=15",
    lastLogin: "3 dni temu",
  },
];

const ROLES = ["Wszystkie", "SUPER_ADMIN", "ADMIN"];
const STATUS = ["Wszystkie", "Aktywne", "Wyłączone"];

export const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Wszystkie");
  const [status, setStatus] = useState("Wszystkie");

  const filtered = useMemo(() => {
    return MOCK_ADMINS.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "Wszystkie" || a.role === role;

      const matchesStatus =
        status === "Wszystkie" ||
        (status === "Aktywne" && a.isActive) ||
        (status === "Wyłączone" && !a.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Crown size={20} />
            Administratorzy
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj dostępem do panelu administracyjnego
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus size={16} />
          Dodaj admina
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
              placeholder="Szukaj admina..."
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
      <div className="space-y-3">
        {filtered.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={admin.avatar}
                className="w-11 h-11 rounded-xl object-cover"
              />

              <div>
                <p className="text-sm font-semibold">{admin.name}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Mail size={12} />
                  {admin.email}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* ROLE */}
              <span className="text-xs px-2 py-1 rounded-md bg-muted flex items-center gap-1">
                <Shield size={12} />
                {admin.role}
              </span>

              {/* STATUS */}
              <span
                className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${
                  admin.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {admin.isActive ? (
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

              {/* LAST LOGIN */}
              <span className="text-xs text-muted-foreground">
                {admin.lastLogin}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-10">
            Brak administratorów
          </div>
        )}
      </div>
    </div>
  );
};
