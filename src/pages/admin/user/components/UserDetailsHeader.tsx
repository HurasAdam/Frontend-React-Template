import {
  ArrowLeft,
  CheckCircle2,
  Edit,
  Mail,
  MoreVertical,
  RefreshCcw,
  UserCog,
  XCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { IUserWithDetails } from "../../../../services/admin/users/users.types";

interface Props {
  user: IUserWithDetails;
  onBack: () => void;
  onEditUser: () => void;
  onResetPassword: () => void;
  onEditRole: () => void;
}

export const UserDetailsHeader = ({
  user,
  onBack,
  onEditUser,
  onResetPassword,
  onEditRole,
}: Props) => {
  return (
    <div className="space-y-6">
      {/* BACK */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Powrót
      </button>

      {/* HEADER ROW */}
      <div className="flex items-start justify-between">
        {/* USER */}
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

        {/* ACTIONS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg border p-2 hover:bg-muted/40">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={onEditUser}>
              <Edit size={14} />
              Edytuj
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onResetPassword}>
              <RefreshCcw size={14} />
              Zresetuj hasło
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onEditRole}>
              <UserCog size={14} />
              Zmień role
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-500">
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
    </div>
  );
};
