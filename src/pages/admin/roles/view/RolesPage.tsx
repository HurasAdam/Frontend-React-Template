import { KeyRound, Plus, Search, Shield } from "lucide-react";
import { useState } from "react";
import { useFindRolesQuery } from "../../../../hooks/roles/use-roles";

const COLORS: Record<string, string> = {
  red: "bg-red-500/10 text-red-500",
  orange: "bg-orange-500/10 text-orange-500",
  blue: "bg-blue-500/10 text-blue-500",
  green: "bg-green-500/10 text-green-500",
  gray: "bg-gray-500/10 text-gray-400",
};

export const RolesPage = ({ openAdd }: { openAdd: () => void }) => {
  const [search, setSearch] = useState("");
  const { data: rolesList = [] } = useFindRolesQuery({ name: search });

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Role systemowe</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Zarządzaj rolami i uprawnieniami w systemie
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} />
          Dodaj rolę
        </button>
      </div>

      {/* SEARCH */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj roli..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rolesList.map((role) => (
          <div
            key={role.id}
            className="rounded-2xl border bg-card p-5 hover:shadow-md transition"
          >
            {/* HEADER ROLE */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${role.labelColor}20`, // 20 = opacity (hex alpha)
                    color: role.labelColor,
                  }}
                >
                  <Shield size={16} />
                </div>

                <div>
                  <p className="font-semibold text-sm">{role.name}</p>
                  <p className="text-xs text-muted-foreground">
                    rola w systemie
                  </p>
                </div>
              </div>
            </div>

            {/* PERMISSIONS */}
            <div className="mt-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <KeyRound size={12} />
                Uprawnienia ({role.permissions.length})
              </div>

              {role.permissions.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Brak przypisanych uprawnień
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.slice(0, 4).map((p) => (
                    <span
                      key={p}
                      className="text-[11px] px-2 py-1 rounded-md bg-muted"
                    >
                      {p}
                    </span>
                  ))}

                  {role.permissions.length > 4 && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-muted text-muted-foreground">
                      +{role.permissions.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {rolesList.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            Brak ról
          </div>
        )}
      </div>
    </div>
  );
};
