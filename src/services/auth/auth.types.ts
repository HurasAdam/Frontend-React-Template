export type Permission = "ADD_ARTICLE" | "ACCESS_ADMIN_PANEL";

export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
  iconKey: string;
  labelColor: string;
}

export interface AuthUserData {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: string;
  lastLogin: string;
  role: UserRole;
}
