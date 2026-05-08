export const Roles = {
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  EDYTOR: "EDYTOR",
  AUTOR: "AUTOR",
  CZYTELNIK: "CZYTELNIK",
} as const;

export type RoleType = keyof typeof Roles;
